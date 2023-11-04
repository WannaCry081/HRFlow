namespace HRIS.Exceptions
{
    public class RecordExistsException : Exception
    {
        public RecordExistsException(string message) : base(message) { }
    }
}
