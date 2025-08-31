// Using CommonJS require for wider compatibility in serverless environments
const nodemailer = require('nodemailer');

const createEmailTemplate = (lead, type) => {
  const logoUrl = 'data:image/png;base64,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';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Notification</title>
      <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e2e2; }
        .header { background-color: #2563EB; padding: 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .header img { max-width: 80px; margin-bottom: 10px; }
        .content { padding: 30px; }
        .content h2 { color: #111827; font-size: 20px; }
        .lead-details { border-collapse: collapse; width: 100%; margin-top: 20px; }
        .lead-details th, .lead-details td { text-align: left; padding: 12px; border-bottom: 1px solid #eeeeee; }
        .lead-details th { color: #6b7280; font-size: 14px; text-transform: uppercase; }
        .lead-details td { color: #1f2937; font-size: 16px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e2e2e2; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Insurance Multiservices Logo">
          <h1>${type === 'central' ? 'New Website Lead' : 'New Lead Assigned to You'}</h1>
        </div>
        <div class="content">
          <h2>${type === 'central' ? 'A new lead has been submitted through the website. Here are the details:' : `Hi ${lead.target ? lead.target.split(' ')[0] : ''}, you have a new lead:`}</h2>
          <table class="lead-details">
            <tr><th>Name</th><td>${lead.name || 'N/A'}</td></tr>
            <tr><th>Email</th><td>${lead.email || 'N/A'}</td></tr>
            <tr><th>Phone</th><td>${lead.phone || 'N/A'}</td></tr>
            ${type === 'central' ? `
            <tr><th>Source</th><td>${lead.source || 'N/A'}</td></tr>
            <tr><th>Type</th><td>${lead.type || 'N/A'}</td></tr>
            <tr><th>Interest/Target</th><td>${lead.target || lead.coverage || 'General'}</td></tr>
            ` : ''}
            <tr><th>Message</th><td>${lead.message || lead.coverage || 'No message provided.'}</td></tr>
          </table>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Insurance Multiservices. All rights reserved.</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return htmlContent;
};


// The handler function for the serverless environment (e.g., Render, Vercel)
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check for essential environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CENTRAL_EMAIL_ADDRESS) {
      console.error('Missing required environment variables for email functionality.');
      // Avoid leaking internal configuration details to the client
      return res.status(500).json({ success: false, error: 'Internal server configuration error.' });
  }

  const { lead, agents } = req.body;

  // Validate the incoming payload
  if (!lead || !agents) {
    return res.status(400).json({ success: false, error: 'Missing lead or agents data in request body.' });
  }

  // Configure the Nodemailer transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,       // Your Gmail address from environment variables
      pass: process.env.GMAIL_APP_PASSWORD, // Your Google App Password from environment variables
    },
  });

  // Prepare the email for the central inbox
  const centralMailOptions = {
    from: `"Web Leads System" <${process.env.GMAIL_USER}>`,
    to: process.env.CENTRAL_EMAIL_ADDRESS,
    subject: `New Lead (${lead.type}): ${lead.name}`,
    html: createEmailTemplate(lead, 'central'),
  };

  try {
    // Send the email to the central address
    await transporter.sendMail(centralMailOptions);

    // If it's an agent-specific lead, find the agent and send a second email
    if (lead.type === 'Agent' && lead.target) {
        const targetAgent = agents.find(agent => agent.name === lead.target);
        if (targetAgent && targetAgent.email) {
            const agentMailOptions = {
                from: `"Lead Notification" <${process.env.GMAIL_USER}>`,
                to: targetAgent.email,
                subject: `You have a new lead: ${lead.name}`,
                html: createEmailTemplate(lead, 'agent'),
            };
            await transporter.sendMail(agentMailOptions);
        }
    }
    
    // Respond with success
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email due to a server error.' });
  }
}