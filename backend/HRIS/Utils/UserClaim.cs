using System.Security.Claims;

namespace HRIS.Utils
{
    public class UserClaim
    {
        public static Guid? GetCurrentUser(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaim = identity.Claims;
                var userIdClaim = userClaim.FirstOrDefault(c => c.Type == ClaimTypes.Name);

                if (userIdClaim != null)
                {
                    var userId = userIdClaim.Value;

                    if (Guid.TryParse(userId, out Guid result))
                    {
                        return result;
                    }
                }
            }

            return null;
        }

        public string? GetCurrentRole(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaim = identity.Claims;
                var userRoleClaim = userClaim.FirstOrDefault(c => c.Type == ClaimTypes.Role);

                if (userRoleClaim != null)
                {
                    return userRoleClaim.Value; ;
                }
            }

            return null;
        }
    }
}
