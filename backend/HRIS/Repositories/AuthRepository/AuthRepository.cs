using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using HRIS.Models.AuthModels;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using HRIS.Models;
using HRIS.Context;

namespace HRIS.Repositories.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public AuthRepository(DataContext context, IConfiguration config)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public Task<bool> RegisterUser(User request)
        {
            throw new NotImplementedException();
        }

        public Task<bool> LoginUser(User request)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SendEmail(ForgotPassword request)
        {
            //VERIFY PASSWORD (User SignUp/SignIn) SQL
            //var user = await _context.Users.FirstorDefaultAsync(u => u.Email == token);
            //user.VerifiedAt = DateTime.Now;
            //await _context.SaveChangesAsync();


            //SEND EMAIL

            var email = new MimeMessage();
            //email used
            email.From.Add(MailboxAddress.Parse(_config.GetSection("Sender:EmailName").Value));
            email.To.Add(MailboxAddress.Parse(request.Email));
            email.Subject = _config.GetSection("Sender:SubjectText").Value;
            email.Body = new TextPart(TextFormat.Html) { Text = EmailContent() };

            using var smtp = new SmtpClient();
            //smtp.(domain) -> smtp.office365.com
            smtp.Connect(_config.GetSection("Sender:EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("Sender:EmailName").Value, _config.GetSection("Sender:EmailPassword").Value);
            var send = await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return send;
        }

        // Used for DB Verification
        private string TokenGenerator(ForgotPassword tokenRequest)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, tokenRequest.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credential);

            var jsonToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jsonToken;
        }

        //Generate 6 Digit Alphanumeric Code
        private string CodeGenerator(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            string alphaString = new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            return alphaString;
        }

        // Email Formatting

        public string EmailContent()
        {
            string emailText = $@"
                    <div style=""background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"">
                        <h2>Email Verification</h2>
                        <p>Hello,</p>
                        <p>Your verification code is:</p>
                        <h3 style=""background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;"">{CodeGenerator(6)}</h3>
                        <p>Please use this code to verify your email address.</p>
                        <p>If you didn't request this verification, you can ignore this email.</p>
                    </div>";

            return emailText;

        }
    }
}
