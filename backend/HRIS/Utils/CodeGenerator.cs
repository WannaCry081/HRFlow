namespace HRIS.Utils
{
    public class CodeGenerator
    {
        private static string _chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static string _digits = "0123456789";

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
    }
}
