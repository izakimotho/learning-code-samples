package kish.helper;

import jakarta.servlet.http.HttpServletRequest;
import kish.security.Principal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class SecurityHelper {
    public static Principal getPrincipal() {
        Principal principal = null;
        Object objPrincipal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (objPrincipal instanceof Principal) {
            principal = ((Principal) objPrincipal);
        }
        return principal;
    }

    public static String getBearerToken(HttpServletRequest request) {
        String bearerToken = null;
        String authorization = request.getHeader(AUTHORIZATION);
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
            bearerToken = authorization.substring(7);
        }
        return bearerToken;
    }
}
