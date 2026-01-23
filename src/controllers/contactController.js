const nodemailer = require('nodemailer');

// In a real application, you'd store submissions in a database
let contactSubmissions = [];

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST contact form submission
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Create submission record
    const submission = {
      id: contactSubmissions.length + 1,
      name,
      email,
      subject: subject || 'No Subject',
      message,
      phone: phone || '',
      createdAt: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };
    
    contactSubmissions.push(submission);
    
    // Send email notification (if email configuration is available)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to yourself
          subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <h3>Message:</h3>
            <p>${message}</p>
            <hr>
            <p><small>Submitted at: ${submission.createdAt}</small></p>
            <p><small>IP Address: ${submission.ip}</small></p>
          `
        };
        
        await transporter.sendMail(mailOptions);
        
        // Send confirmation email to the user
        const confirmationMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting me',
          html: `
            <h2>Thank You!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to me. I've received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of your message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff;">
              <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            <p>Best regards,<br>Ahadul Sohag</p>
          `
        };
        
        await transporter.sendMail(confirmationMailOptions);
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email sending fails
      }
    }
    
    res.status(201).json({
      message: 'Contact form submitted successfully',
      submission: {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        subject: submission.subject,
        createdAt: submission.createdAt
      }
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

// GET all contact submissions (admin functionality)
const getAllContactSubmissions = (req, res) => {
  try {
    const { limit = 50, page = 1, status } = req.query;
    
    let filteredSubmissions = contactSubmissions;
    
    if (status) {
      filteredSubmissions = filteredSubmissions.filter(submission => 
        submission.status === status
      );
    }
    
    // Sort by date (newest first)
    filteredSubmissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    
    res.json({
      submissions: paginatedSubmissions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredSubmissions.length / limit),
        totalSubmissions: filteredSubmissions.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
};

// GET contact submission by ID (admin functionality)
const getContactSubmissionById = (req, res) => {
  try {
    const { id } = req.params;
    const submission = contactSubmissions.find(s => s.id === parseInt(id));
    
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact submission' });
  }
};

// DELETE contact submission (admin functionality)
const deleteContactSubmission = (req, res) => {
  try {
    const { id } = req.params;
    const submissionIndex = contactSubmissions.findIndex(s => s.id === parseInt(id));
    
    if (submissionIndex === -1) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    
    contactSubmissions.splice(submissionIndex, 1);
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact submission' });
  }
};

// GET contact form statistics
const getContactStats = (req, res) => {
  try {
    const totalSubmissions = contactSubmissions.length;
    const last30Days = contactSubmissions.filter(submission => {
      const submissionDate = new Date(submission.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return submissionDate > thirtyDaysAgo;
    });
    
    const stats = {
      totalSubmissions,
      last30Days: last30Days.length,
      averagePerDay: (last30Days.length / 30).toFixed(2),
      recentSubmissions: contactSubmissions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact statistics' });
  }
};

module.exports = {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  getContactStats
};