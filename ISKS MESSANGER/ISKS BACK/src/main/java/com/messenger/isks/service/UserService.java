package com.messenger.isks.service;

import com.messenger.isks.dto.LoginDTO;
import com.messenger.isks.dto.UserDTO;
import com.messenger.isks.response.LoginResponse;

public interface UserService {

    String addUser(UserDTO userDTO);

    LoginResponse loginUser(LoginDTO loginDTO);
}
