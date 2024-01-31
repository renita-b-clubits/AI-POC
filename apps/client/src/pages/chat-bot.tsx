import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";

interface Message {
  question: string;
  answer: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      const formData = new URLSearchParams();
      formData.append("user_message", inputMessage);

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post("http://127.0.0.1:5000/chat", formData, config)
        .then((response) => {
          console.log(response.data.answer);
          setMessages([...messages, response.data]);
        });

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        style={{ height: "80vh", overflowY: "auto", padding: "16px" }}
      >
        <List>
          {messages.map((message, index) => (
            <>
              <ListItem key={index} alignItems="flex-start">
                {message.question && (
                  <ListItemText
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        maxWidth: "70%",
                        wordBreak: "break-all",
                        border: "1px solid lightblue",
                        backgroundColor: "lightblue",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <strong>You:</strong> {message.question}
                    </Typography>
                  </ListItemText>
                )}
              </ListItem>

              <ListItem>
                {message.answer && (
                  <ListItemText
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        maxWidth: "70%",
                        wordBreak: "break-all",
                        border: "1px solid lightgreen",
                        backgroundColor: "lightgreen",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <strong>Bot:</strong> {message.answer}
                    </Typography>
                  </ListItemText>
                )}
              </ListItem>
            </>
          ))}
        </List>
      </Paper>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="message"
        label="Type your question"
        name="message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Container>
  );
};

export default ChatBox;
