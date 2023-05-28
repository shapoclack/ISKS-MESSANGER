package com.messenger.isks.controller;

import com.messenger.isks.dto.LoginDTO;
import com.messenger.isks.dto.UserDTO;
import com.messenger.isks.model.Message;
import com.messenger.isks.response.LoginResponse;
import com.messenger.isks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin
@RequestMapping("/user")
public class MainController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message){
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        System.out.println(message.toString());
        return message;
    }
    @Autowired
    private UserService userService;

@PostMapping("/save")
@ResponseStatus(HttpStatus.CREATED)
    public String saveUser(@RequestBody @Valid UserDTO userDTO){
    return userService.addUser(userDTO);
}


@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
    LoginResponse loginResponse = userService.loginUser(loginDTO);
    return ResponseEntity.ok(loginResponse);

}
}