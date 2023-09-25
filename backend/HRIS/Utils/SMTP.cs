using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace HRIS.Utils
{
    public class SMTP
    {
        public async static Task<string> SendEmail(IConfiguration configuration, string email, string code)
        {
            var mail = new MimeMessage();

            mail.From.Add(MailboxAddress.Parse(configuration.GetSection("Sender:EmailName").Value));
            mail.To.Add(MailboxAddress.Parse(email));
            mail.Subject = configuration.GetSection("Sender:SubjectText").Value;
            mail.Body = new TextPart(TextFormat.Html) { Text = EmailContent(code) };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                   configuration.GetSection("Sender:EmailHost").Value, 587,
                   SecureSocketOptions.StartTls);

            await smtp.AuthenticateAsync(
                configuration.GetSection("Sender:EmailName").Value,
                configuration.GetSection("Sender:EmailPassword").Value);

            await smtp.SendAsync(mail);

            await smtp.DisconnectAsync(true);
            return "Email sent successfully";
        }

        private static string EmailContent(string code)
        {
            string emailText = $@"
            <div style=""background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"">
                <h2>Email Verification</h2>
                <p>Hello,</p>
                <p>Your verification code is:</p>
                <h3 style=""background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;"">{code}</h3>
                <p>Please use this code to verify your email address.</p>
                <p>If you didn't request this verification, you can ignore this email.</p>
            </div>";
            return emailText;
        }
    }
}
