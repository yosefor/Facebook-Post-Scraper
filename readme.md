# Facebook Page Data Scraper

A quick Chrome extension (built in under 20 minutes) designed to streamline the process of collecting Facebook page information for personalized AI-powered outreach campaigns. This is a practical example of rapid prototyping to solve a specific business need - automating data collection for personalized outreach.

## Motivation

This extension was developed to solve a common challenge in B2B sales and marketing: gathering relevant business information efficiently for personalized outreach. By automating the collection of Facebook page data, including business descriptions and recent posts, the extension enables:

- Quick data gathering for AI-powered personalization
- More contextual and relevant cold outreach messages
- Time savings in the lead research process
- Better understanding of potential clients' business activities

## Features

- One-click extraction of business page information
- Captures business description and "About" section
- Collects the last 10 posts from the page
- Automatic copying to clipboard in a structured format
- Easy integration with AI tools for message personalization

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your Chrome toolbar

## Usage

1. Navigate to any Facebook business page
2. Click the extension icon in your Chrome toolbar
3. Click "Copy Page Info & Last 10 Posts"
4. The data will be automatically copied to your clipboard in this format:
```
Business Name: [Name]
About: [Description]

Posts:
[Array of recent posts with timestamps]
```

5. Use the copied data with your preferred AI tool to generate personalized outreach messages

## Output Format

The extension outputs data in a structured format:

```json
{
  "pageInfo": {
    "businessName": "Business Name",
    "shortDescription": "Business Description"
  },
  "posts": [
    {
      "text": "Post content",
      "timestamp": "Post time",
      "index": 1
    },
    // ... more posts
  ]
}
```

## Best Practices for AI Integration

1. Use the business description to understand the company's main offerings
2. Analyze recent posts to identify:
   - Current priorities
   - Pain points
   - Business language and tone
   - Recent achievements or changes
3. Feed this information to AI tools to generate contextually relevant outreach messages

## Privacy & Ethics

- Only use this tool on public business pages
- Respect Facebook's terms of service and robots.txt
- Use the gathered information responsibly
- Follow all applicable privacy laws and regulations
- Don't store or share collected data inappropriately

## Technical Notes

- The extension uses Manifest V3
- Required permissions: activeTab, scripting, clipboardWrite
- Supports RTL languages (Hebrew, Arabic, etc.)
- Handles various Facebook page layouts


2. No data copied
   - Confirm you're on a Facebook business page
   - scroll down to load more posts

## Contributing

Feel free to submit issues and enhancement requests. We welcome your contributions to improve the extension.

## License

MIT License - feel free to use this tool for your business needs.

## Disclaimer

This tool is for educational and professional use only. Users are responsible for ensuring their use complies with Facebook's terms of service and applicable laws.