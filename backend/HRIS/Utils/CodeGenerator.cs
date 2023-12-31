﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HRIS.Utils
{
    public class CodeGenerator
    {
        private readonly static string _chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private readonly static string _digits = "0123456789";

        public static string Digit(int length)
        {
            Random random = new();
            string digits = new(Enumerable.Repeat(_digits, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            return digits;
        }

        public static string AlphaNumeric(int length)
        {
            Random random = new();
            string alphaNumeric = new(Enumerable.Repeat(_chars + _digits, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            return alphaNumeric;
        }

        public static string Token(IConfiguration configuration, Guid id, string role, DateTime expiresIn)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, id.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value!));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: expiresIn,
                signingCredentials: credential
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
