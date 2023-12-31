﻿namespace HRIS.Utils
{
    public class Password
    {
        public static void Encrypt(string password, out string passwordHash, out string passwordSalt)
        {
            passwordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            passwordHash = BCrypt.Net.BCrypt.HashPassword(password, passwordSalt);
        }

        public static bool Verify(string passwordHash, string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
