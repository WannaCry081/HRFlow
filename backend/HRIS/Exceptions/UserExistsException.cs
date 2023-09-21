namespace HRIS.Exceptions
{
    public class UserExistsException : Exception
    {
        public UserExistsException(string message) : base(message) { }
    }
}
