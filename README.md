# chat_group
Group Chat app for CA3
Eleanor Noonan N00147654
IADT April 2017
Networking and Distributed Systems CA3


The purpose of this assignment is to develop a client-server web application.
This is a single room chat app where all current users connected to the URL can message eachother; 
all the users can see eachother's messages.

When a user lands on the URL, a client-server connection is made and the client is assigned a clientID

The user is invited to enter a username which is a nickname for the duration of the group chat.
The user enters a username and presses the submit button.
A welcome message to the new user will appear above.
The username input form will be removed from the screen.
The new user's name is added to the currently active users list above.

When two or more users have landed on the URL, connected and entered their usernames then a chat session can begin.
The user is invited to enter a message in the message input form.
The user enters a message and presses send.
The username of the message sender and the current message is displayed on all currently active user screens 
(alternating background colours assist to differentiate the messages)
The message input form is cleared for the next message ... from who ever decides to add a new message.

When a user leaves the group (disconnects from the session), 
the associated username will be removed from the list of currently active users.
Likewise, when a new user joins the group, their username will be added to the currently active users list.

