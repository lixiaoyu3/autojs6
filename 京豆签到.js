//解锁手机
var unlockType = 1 // 根据需求修改，1为图案解锁，2为数字密码解锁，其它任意值默认为上滑解锁。
var password = "000000" //解锁方式为数字密码时，将此处数字修改为自己的解锁密码。
// 解锁方式为图案解锁时，将下列点位修改为自己的图案坐标。
var gestureArray = [[548 , 1795], [550, 2050], [540, 1530], [280, 1790], [800, 1790]]
run();//计时
curTime = new Date();
date = curTime.getFullYear() + "-" + (curTime.getMonth() + 1) + "-" + curTime.getDate();
log(`今天是：${date}`);
sleep(500);
var centerX;
var centerY;
var len;
var done;
var p2;
var rX;//设置全局变量
var watch;
var percentaper;
main();

//解锁
function unLock(){  
    device.keepScreenOn(2400 * 1080);
    log("开始解锁设备");
    sleep(1000);
    gesture(100, [540, 1900], [540, 1200]);    // 滑动解锁
    sleep(1000);
    if (unlockType == 1){
        log("图案解锁")
        gesture(800,gestureArray);  // 模拟滑动操作
    }else if(unlockType == 2){
        log("数字密码解锁")
        for(i = 0; i < password.length; i++){
            desc(password[i]).findOne().click()
        }
    }
    log("解锁完成");
    sleep(1000);
}

// 打开京东App
function openJDApp() {
  log("正在打开京东App");
  launchApp("京东");
  sleep(5000); // 等待App加载
}

// 导航到签到页面
function navigateToSignIn() {
  log("正在进入签到页面");
  // 这里需要根据实际界面编写点击操作
  // 例如:
  // click(100, 200); // 点击"我的"
  // sleep(1000);
  // click(300, 400); // 点击"签到领京豆"
  sleep(2000);
}

// 执行签到
function signIn() {
  log("正在签到");
  // 这里需要根据实际界面编写签到操作
  // 例如:
  // if(text("签到").exists()) {
  //   text("签到").findOne().click();
  // } else {
  //   log("今日已签到");
  // }
  sleep(2000);
}

// 关闭App
function closeApp() {
  log("正在关闭京东App");
  home();
  sleep(1000);
}

// 主函数
function main() {
  unLock();
  openJDApp();
  navigateToSignIn();
  signIn();
  closeApp();
  log("签到流程结束");
}

// 运行主函数
main();
