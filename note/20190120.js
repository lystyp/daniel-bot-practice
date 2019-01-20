20190120
研究怎麼搬到heroku
有兩個東西要研究
1. code丟到heroku上面之後她是麼跑的?應該是有下一個指令去讓server跑起來
    先用npm init指令來init node專案，他會建一個package.json檔，這個檔就是用來專案內容，
重要的有 : 
要裝那些套件(npm install --save要有save參數才會在裝套件的時候順便更新json) > 
"dependencies": {
    "linebot": "^1.4.1"
  },
專案的main檔是哪一個
"scripts": {
    "start": "node main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
要執行這個專案的時候，除了可以用node main.js外，也可以用npm start來跑package.json裡描述的script裡的start，
heruko就是用npm start來跑


2.我line的node library是用npm裝在電腦上，heruko上面要怎麼裝?
heroku好像知道專案是node js之後就會直接去找package.json來裝了


3.有一些token不能公開，怎辦?可以放到heruko的設定裡,當作環境變數來call
https://medium.com/@wanwanyang/%E4%BD%BF%E7%94%A8node-js%E5%9C%A8heroku%E4%B8%8A%E6%9E%B6%E8%A8%ADline%E6%A9%9F%E5%99%A8%E4%BA%BA-60ec3f6cac7f
Heroku的Dashboard裡的Settings頁面，找到Config Variables這個大項，
點Reveal Config Vars會出現變數設定的欄位，把剛才兩個值分別取變數名字貼進去，後面寫機器人的時候會用到。


4.看丟在heroku上的server的log
指令 :　heroku logs -t  -a daniel-bot-practice

5.研究怎麼架Docker
要裝兩個東西 
>boot2docker
https://joshhu.gitbooks.io/docker_theory_install/content/DockerBible/mac_oswindowsboot2docker.html
照這個網站做跑步起來不知為何
(建議去官網找新的)
>Docker Toolbox
下載 : https://docs.docker.com/toolbox/toolbox_install_windows/
說明 : https://docs.docker.com/docker-for-windows/
照這個有跑起來，但這個建的container不知道是for window還是for linux