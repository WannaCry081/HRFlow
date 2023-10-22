namespace HRIS.Exceptions
{
    public class TeamExistsException : Exception
    {
        public TeamExistsException(string message) : base(message) { }
    }
}
