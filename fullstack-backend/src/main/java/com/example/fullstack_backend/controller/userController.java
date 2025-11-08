package com.example.fullstack_backend.controller;

import com.example.fullstack_backend.exception.UserNotFoundException;
import com.example.fullstack_backend.model.User;
import com.example.fullstack_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin("http://localhost:3000/")

public class userController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser (@RequestBody User newUser){

        return userRepository.save(newUser);
    }

    @GetMapping("/get")
    List <User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/get/{id}")
    User getUserById(@PathVariable  Long id){
        return userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException(id));
    }

    @PutMapping("/update/{id}")
    User UpdateUser (@RequestBody User newUser, @PathVariable Long id){

        return userRepository.findById(id)
                .map(user ->{
                    user.setEmpname(newUser.getEmpname());
                    user.setEmail(newUser.getEmail());
                    user.setAge(newUser.getAge());
                    user.setSalary(newUser.getSalary());

                    return userRepository.save(user);
                })
                .orElseThrow(()-> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String DeleteUser (@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id "+ id + " deleted succesfully!";


    }

}
