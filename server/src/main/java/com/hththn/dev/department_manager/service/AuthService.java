package com.hththn.dev.department_manager.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.hththn.dev.department_manager.dto.request.UserLoginDTO;
import com.hththn.dev.department_manager.dto.request.UserSsoDTO;
import com.hththn.dev.department_manager.dto.response.ResLoginDTO;
import com.hththn.dev.department_manager.exception.UserInfoException;
import com.hththn.dev.department_manager.repository.UserRepository;
import com.nimbusds.jose.shaded.gson.Gson;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.hththn.dev.department_manager.entity.User;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class AuthService {

    static String RESPONSE_TYPE = "code";
    static String SCOPE = "email profile";
//    static String FACEBOOK_SCOPE = "email public_profile";
    static String GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth";
//    static String FACEBOOK_AUTH_URL = "https://www.facebook.com/v21.0/dialog/oauth";

    final AuthenticationManagerBuilder authenticationManagerBuilder;
    final UserService userService;
    final UserRepository userRepository;
    final SecurityUtil securityUtil;

//    public AuthService(AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService, UserRepository userRepository, SecurityUtil securityUtil) {
//        this.authenticationManagerBuilder = authenticationManagerBuilder;
//        this.userService = userService;
//        this.userRepository = userRepository;
//        this.securityUtil = securityUtil;
//    }

    // get user info
    public ResLoginDTO getLogin(UserLoginDTO loginDto) {
        // Put input including username/password into Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        // authenticate user => need to define loadUserByUsername method
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // Put information into securitycontext if user logins successfully. Spring has already done it, but we can config in here.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO res = new ResLoginDTO();

        // return user's info
        User currentUserDB = this.userService.getUserByUsername(loginDto.getUsername());
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getName());
            res.setUser(userLogin);
        }

        // create a token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), res.getUser(), authentication.getAuthorities());
        res.setAccessToken(access_token);

        return res;
    }

    // get current user from security context
    public ResLoginDTO.UserLogin getUserLogin() {
        String email = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        User currentUserDB = this.userService.getUserByUsername(email);
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        if (currentUserDB != null) {
            userLogin.setId(currentUserDB.getId());
            userLogin.setEmail(currentUserDB.getEmail());
            userLogin.setName(currentUserDB.getName());
        }
        return userLogin;
    }

    // logout
    public ResponseCookie handleLogout() throws UserInfoException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";

        if (email.isEmpty()) {
            throw new UserInfoException("Access token isn't valid");
        }

        // update refresh token = null
        this.userService.updateUserToken(null, email);

        // remove refresh token cookie
        return ResponseCookie
                .from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
    }




    String buildUrlWithParams(String baseUrl, Map<String, String> params) {
        StringBuilder urlBuilder = new StringBuilder(baseUrl);
        urlBuilder.append("?");
        params.forEach((key, value) ->
                urlBuilder.append(key).append("=").append(value).append("&")
        );
        return urlBuilder.substring(0, urlBuilder.length() - 1);
    }


}
