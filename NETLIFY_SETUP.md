# Netlify Deployment & Form Setup Guide

## Overview
Your website uses **Netlify Forms** - their native form handling that automatically sends emails when forms are submitted.

## ✅ Email Subject Format

Emails will automatically include the company name:

```
🎯 New Consultation: Acme Corp - AI Foundation Strategy
🎯 New Consultation: TechStart Inc - Platform Migration
🎯 New Consultation: Global Solutions - Strategic Assessment
```

This makes it super easy to search and filter emails by company!

---

## 🚀 Deployment Steps

### Step 1: Push to Git Repository

```bash
cd /Users/vshaikh/working-ai/integrationboutique

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Integration Boutique website"

# Add remote (GitHub, GitLab, or Bitbucket)
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command:** Leave empty (static site)
   - **Publish directory:** `.` (current directory)
6. Click **"Deploy site"**

### Step 3: Configure Form Notifications

After deployment:

1. Go to your site dashboard on Netlify
2. Click **"Forms"** in the left sidebar
3. Click on your **"consultation"** form
4. Click **"Form notifications"**
5. Click **"Add notification"** → **"Email notification"**
6. Configure:
   - **Email to notify:** `connect@integrationboutique.com`
   - **Subject:** Will be automatically set by form (includes company name!)
7. Click **"Save"**

### Step 4: Test the Form

1. Visit your live Netlify URL
2. Fill out the consultation form
3. Submit it
4. Check `connect@integrationboutique.com` inbox
5. You should receive an email with company name in subject!

---

## 📧 Email Format

Netlify will send you emails containing:

**Subject:**
```
🎯 New Consultation: [Company Name] - [Service]
```

**Body includes all form fields:**
- First Name
- Last Name
- Email
- Company
- Service Interest
- Message
- Submission timestamp

---

## 🎯 Features

✅ **No backend required** - Netlify handles everything  
✅ **Company name in subject** - Easy email search and filtering  
✅ **Spam protection** - Built-in honeypot field  
✅ **Form submissions dashboard** - View all submissions in Netlify  
✅ **Export submissions** - Download as CSV  
✅ **Webhook support** - Integrate with other services  
✅ **Free tier** - 100 form submissions/month  

---

## 🔧 Advanced Configuration

### Custom Email Templates (Optional)

You can customize the email format in Netlify:

1. Go to **Site settings** → **Forms**
2. Edit **Email template**
3. Use these variables:
   - `{{FIELD_NAME}}` - Form field values
   - `{{SUBMISSION_ID}}` - Unique submission ID
   - `{{FORM_NAME}}` - Form name
   - `{{SUBMISSION_DATE}}` - Date/time

### Slack Notifications (Optional)

1. Go to **Form notifications** → **Add notification**
2. Choose **"Slack notification"**
3. Connect your Slack workspace
4. Choose channel and customize message

### Webhook Integration (Optional)

Send form data to external services:

1. Go to **Form notifications** → **Add notification**
2. Choose **"Outgoing webhook"**
3. Enter your webhook URL
4. Form data will be POST'ed as JSON

### Zapier Integration (Optional)

Connect to 5000+ apps:

1. Go to **Form notifications** → **Add notification**
2. Choose **"Zapier"**
3. Follow setup wizard
4. Connect to CRM, email marketing, etc.

---

## 📊 View Form Submissions

All submissions are stored in Netlify:

1. Go to your site dashboard
2. Click **"Forms"** in sidebar
3. Click on **"consultation"** form
4. View all submissions with timestamps
5. Export to CSV if needed

---

## 🛡️ Spam Prevention

Built-in protections:

- **Honeypot field** - Hidden field that bots fill out
- **reCAPTCHA** - Can be enabled in form settings
- **Submission rate limiting** - Prevents abuse

To enable reCAPTCHA:

1. Go to **Site settings** → **Forms**
2. Enable **reCAPTCHA**
3. Add to form: `<div data-netlify-recaptcha="true"></div>`

---

## 💰 Pricing

**Free Tier:**
- 100 form submissions/month
- Email notifications
- Spam filtering
- 1GB bandwidth
- 100GB data transfer

**Pro Plan ($19/month):**
- 1,000 submissions/month
- Background functions
- Analytics
- More storage

For most small businesses, free tier is sufficient!

---

## 🐛 Troubleshooting

### Forms not showing up in Netlify dashboard

**Solution:** Make sure your form has:
```html
<form name="consultation" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="consultation">
```

### Not receiving email notifications

**Solutions:**
1. Check spam folder
2. Verify email address in Form notifications
3. Make sure form is properly configured with `data-netlify="true"`
4. Check Netlify Forms dashboard to see if submissions are being recorded

### Subject line not showing company name

**Solution:** The JavaScript updates the subject field before submission:
```javascript
subjectField.value = `🎯 New Consultation: ${company} - ${service}`;
```

Make sure JavaScript is enabled and form submits via AJAX.

### Form submission fails

**Solutions:**
1. Check browser console for errors
2. Verify all required fields are filled
3. Check Netlify deploy logs for issues
4. Make sure `netlify.toml` is in root directory

---

## 🔒 Security

Netlify Forms includes:
- DDoS protection
- SSL/TLS encryption
- Spam filtering
- Rate limiting
- No database to hack

Your data is secure with Netlify's infrastructure.

---

## 📚 Resources

- **Netlify Forms Docs:** https://docs.netlify.com/forms/setup/
- **Form Notifications:** https://docs.netlify.com/forms/notifications/
- **Netlify Support:** https://www.netlify.com/support/

---

## 🎉 You're All Set!

Once deployed to Netlify:
1. ✅ Forms automatically work
2. ✅ Emails sent to connect@integrationboutique.com
3. ✅ Company name appears in subject line
4. ✅ Spam protection enabled
5. ✅ Submission history stored

**No backend code or email server needed!** 🚀
