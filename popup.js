// popup.js
document.getElementById('scrapeButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapePosts
      });
      
      const data = results[0].result;
      if (data.pageInfo.shortDescription) {
        const output = `Business Name: ${data.pageInfo.businessName}\nDescription: ${data.pageInfo.shortDescription}\n\nPosts:\n${JSON.stringify(data.posts, null, 2)}`;
        await navigator.clipboard.writeText(output);
        document.getElementById('status').textContent = `Copied page info and ${data.posts.length} posts to clipboard!`;
      } else {
        document.getElementById('status').textContent = 'No description found. Make sure you\'re on the correct Facebook page.';
      }
    } catch (error) {
      document.getElementById('status').textContent = 'Error: ' + error.message;
    }
  });
  
  function scrapePosts() {
    const pageInfo = {};
    const posts = [];
    
    // Get page name
    const pageNameElement = document.querySelector('h1');
    pageInfo.businessName = pageNameElement ? pageNameElement.textContent.trim() : 'Unknown Page';
    
    // Get the business description
    let shortDescription = '';
    
    // Find the "About" section heading (works for both English "About" and Hebrew "בקצרה")
    const aboutHeadings = Array.from(document.querySelectorAll('h2')).filter(h2 => {
      const text = h2.textContent.trim().toLowerCase();
      return text === 'about' || text === 'בקצרה';
    });
    
    if (aboutHeadings.length > 0) {
      const aboutSection = aboutHeadings[0].closest('div[class*="x1n2onr6"]');
      if (aboutSection) {
        // Look for the description in the next sibling elements
        let currentElement = aboutSection;
        while (currentElement && !shortDescription) {
          // Look for spans with dir="auto" that contain substantial text
          const descSpans = currentElement.querySelectorAll('span[dir="auto"]');
          for (const span of descSpans) {
            const text = span.textContent.trim();
            // Check if this is a substantial text (not just a label or short text)
            if (text.length > 20 && !text.includes('http') && !span.closest('a')) {
              shortDescription = text;
              break;
            }
          }
          currentElement = currentElement.nextElementSibling;
        }
      }
    }
  
    // Fallback method if the above didn't work
    if (!shortDescription) {
      // Try to find the first substantial text content after the page name
      const mainContent = document.querySelector('div[role="main"]');
      if (mainContent) {
        const spans = mainContent.querySelectorAll('span[dir="auto"]');
        for (const span of spans) {
          const text = span.textContent.trim();
          // Look for substantial text that's not a link or button
          if (text.length > 20 && !text.includes('http') && !span.closest('a') && !span.closest('button')) {
            shortDescription = text;
            break;
          }
        }
      }
    }
  
    pageInfo.shortDescription = shortDescription;
  
    // Get posts
    const postElements = document.querySelectorAll('[role="article"]');
    
    for (let i = 0; i < Math.min(10, postElements.length); i++) {
      const postElement = postElements[i];
      const contentDiv = postElement.querySelector('[data-ad-comet-preview="message"]') ||
                        postElement.querySelector('[data-ad-preview="message"]');
      
      if (contentDiv) {
        const postText = contentDiv.textContent.trim();
        const timestamp = postElement.querySelector('a[href*="/posts/"]')?.textContent || 'Unknown time';
        
        posts.push({
          text: postText,
          timestamp: timestamp,
          index: i + 1
        });
      }
    }
    
    return {
      pageInfo: pageInfo,
      posts: posts
    };
  }