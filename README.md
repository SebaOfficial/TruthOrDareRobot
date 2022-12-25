# TruthOrDareRobot
This Telegram bot was developed for the simple goliardic desire to play Truth or Dare with multiple modes. 

## Table of Contents

* [Installation](#installation)
* [Database Structure](#database-structure)
* [License](#license)
* [Credits](#credits)

## Installation

Here's a guide to install TruthOrDareRobot locally

1. Install PHP and other packages<br>
`sudo apt update && sudo apt install php8.1 && sudo apt-get install -y php8.1-curl php8.1-mysql php8.1-cli && echo 'PHP installed.'`

2. Install MariaDB<br>
`sudo apt install mariadb-server && sudo mysql_secure_installation && echo 'MariaDB server installed.'`

3. Clone this repository<br>
`git clone https://github.com/SebaOfficial/TruthOrDareRobot.git && cd TruthOrDareRobot`

4. Edit the [utils.php](https://github.com/SebaOfficial/TruthOrDareRobot/blob/master/utils.php) file with your credentials and informations

5. Run the [checkErrors.php](https://github.com/SebaOfficial/TruthOrDareRobot/blob/master/checkErrors.php) file to check for any errors and to create all the required tables in the database<br>
`php checkErrors.php`

If everything is okay you should have your bot running correctly.<br>
Otherwise feel free to [contact me](https://racca.me#contact). 

## Database Structure

* Tables
    * Users<br>
    *Contains information about all the users:*<br>
        1. Telegram id (**id**);
        2. Last action in the bot (**action**);
        3. If they blocked the bot (**active**)
        4. The mode they are playing (**mode**)
        5. Their preferred language (**lang**)
    * Texts<br>
    *Contains all the texts the bot will use:*<br>
        1. The text id (**id**)
        2. The columns for the languages (**lang-code**)
        3. The type of a button, *optional* (**type**)
        4. The callback or url of a button, *optional* (**callback**)<br>

    * Truths/Dares<br>
    *Those two tables contain all the truths and dares*
        1. The id (**id**)
        2. The mode they will be shown to (**mode**)
        3. The culomns for the languages (**lang-code**)


Download an exaple of the database [here](https://racca.me/database-structure/TruthOrDareRobot.sql)

## License
This project is open source and available under the [**MIT** License](https://github.com/SebaOfficial/TruthOrDareRobot/blob/master/LICENSE).

## Credits
* This project is created by [@SebaOfficial](https://github.com/SebaOfficial) using the [Telegram APIs](https://core.telegram.org/bots/api)
    * [Contact Me](https://racca.me#contact)
* [Live demo of the bot](https://t.me/TruthOrDareRobot)
* [Database used](https://mariadb.org/)
