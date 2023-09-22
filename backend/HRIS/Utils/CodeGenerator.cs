namespace HRIS.Utils
{
    public class CodeGenerator
    {
        private readonly Random _random;

        private string _chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private string _digits = "0123456789";

        public CodeGenerator()
        {
            _random = new Random();
        }

        public string Digit(int length)
        {
            string digits = new string(Enumerable.Repeat(_digits, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());

            return digits;
        }

        public string AlphaNumeric(int length)
        {
            string alphaNumeric = new string(Enumerable.Repeat(_chars + _digits, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());

            return alphaNumeric;
        }
    }
}
