# Email Setup Instructions for True Lux Construction Contact Form

## Overview
The contact form is configured to use Resend (https://resend.com), a modern email API service that integrates seamlessly with Vercel.

## Setup Steps

### 1. Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account (3,000 emails/month included)
3. Navigate to API Keys section
4. Create a new API key and copy it

### 2. Configure Vercel Environment Variables
1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your TrueLux project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

#### Required Variables
- **Name:** `RESEND_API_KEY`
  - **Value:** Your API key from Resend
  - **Environments:** Production, Preview, Development

#### Optional Variables (Recommended)
- **Name:** `CONTACT_EMAIL`
  - **Value:** `jordan@trueluxconstruction.com`
  - **Description:** Where form submissions will be sent
  - **Environments:** Production, Preview, Development

- **Name:** `FROM_EMAIL`
  - **Value:** `True Lux Construction <noreply@yourdomain.com>`
  - **Description:** The sender email address (requires domain verification)
  - **Environments:** Production, Preview, Development

### 3. Domain Verification (Optional but Recommended for Production)
For professional emails from your own domain:
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `trueluxconstruction.com`)
4. Follow the DNS configuration instructions
5. Wait for verification (usually takes a few minutes)
6. Once verified, update `FROM_EMAIL` to use your domain

### 4. Redeploy Your Site
After adding environment variables:
1. Go to **Deployments** tab in Vercel
2. Find your latest deployment
3. Click the three dots (...) menu
4. Select **Redeploy**
5. Wait for deployment to complete

### 5. Testing
1. Visit your live site
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check the configured email address for the submission

## Form Data Collected
The contact form collects and sends:
- Full Name
- Email Address
- Phone Number
- Project Location
- Project Type (Residential/Commercial)
- Timeline (Near-term/Flexible/Future planning)
- Project Description

## Email Format
Submissions will be formatted as HTML emails with:
- Clear subject line: "New Consultation Request from [Name]"
- Reply-to set to the submitter's email
- All form fields displayed in an organized format

## Troubleshooting

### Form shows "Email service not configured" error
- The `RESEND_API_KEY` environment variable is missing
- Add it in Vercel Settings and redeploy

### Emails not arriving
- Check Resend dashboard logs for delivery status
- Verify the `CONTACT_EMAIL` address is correct
- Check spam folder
- Ensure domain is verified if using custom domain

### Getting 500 errors
- Check Vercel function logs for specific error messages
- Verify API key is valid in Resend dashboard
- Ensure all required form fields are filled out

## Cost
- Resend free tier: 3,000 emails/month
- Additional emails: $1 per 1,000 emails
- For a contact form, the free tier should be more than sufficient

## Alternative: Using Default Resend Domain
If you don't want to verify a custom domain immediately:
- Leave `FROM_EMAIL` unset or use: `True Lux Construction <onboarding@resend.dev>`
- Emails will work fine, but the sender address won't be your custom domain
- You can always upgrade to a verified domain later

## Support
- Resend Documentation: https://resend.com/docs
- Resend Support: https://resend.com/support
