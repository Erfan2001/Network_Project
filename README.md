 # Socket Programming Project
 
 ## Project description:

 This comprehensive project encompasses two integral components: a server program and a constellation of client programs. Underpinning this architectural framework is the notion that various university faculties, represented by the client programs, communicate student information to the overarching university network, embodied by the server program. This orchestration facilitates the transmission of pertinent data and the subsequent reception of tailored responses across the network.

The project's workflow can be encapsulated into the following steps:

Initiation commences with the server program, which solicits the number of university faculties from the administrative user. For instance, this could entail specifying the presence of three faculties.
In accordance with the determined count of faculties, the project necessitates the creation and deployment of distinct client programs.
Each faculty's student information, encompassing details such as name, surname, national code, ID number, and academic scores, is systematically collected from the users. Consequently, the first client program pertains to the first faculty, the second to the second faculty, and so forth.
Subsequently, the client programs convey the entered data to the server program for central processing.
The server program adeptly stores the received data in a meticulously structured database.
Client programs possess the capacity to request specific actions by forwarding predefined keywords to the server program, eliciting corresponding responses:
"Average" (request) → "Appropriate Response" (response): Initiating this query to the server prompts the dissemination of each student's academic standing and grade point average, accompanied by their national identification records, to the respective client program.
"Sort" → "Correct Answer": Under this command, the server calculates each student's academic average.
"Visit" → "Correct Answer": The server orchestrates an expeditious visit to the faculty and conveys the outcome, coupled with the student's birth certificate number, back to the pertinent client program.
"Max" → "Correct Answer": By issuing this command, the server identifies the most accomplished faculty and furnishes its name and accolades to the designated client program.
"Min" → "Correct Answer": This directive prompts the server to pinpoint the least accomplished faculty and relay its name and distinctions to the associated client program.
Noteworthy considerations:

This project is an individual endeavor, necessitating dedicated effort.
It mandates programming proficiency with a focus on networking and Saskat programming.
Plagiarism or duplicative projects will not receive any credit.
The project can be executed on either multiple separate laptops or, due to hardware constraints, on a single device.
The project's four components cumulatively contribute to the final evaluation.
While graphical user interfaces (GUI) are not mandatory, a functional and user-friendly GUI can garner extra credit.
Incorporating the capability to send and receive student information via files and the network may earn additional points.
The potential to obfuscate exchanged HTTP messages through the Pcap network library is eligible for extra credit.
Implementation of other practical features enhancing client-server interactions may also yield extra credit.


 Presentation Link: https://drive.google.com/file/d/1mXRR46xL3AyNSBwjAKU9irI0jmNYRHN9/view?usp=sharing

 *Implemented By Erfan Nourbakhsh*
 
 *Spring 2022*
