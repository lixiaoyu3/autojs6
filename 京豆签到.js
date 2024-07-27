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
  click(965, 2330); // 点击"我的"
  sleep(1000);
  click(340, 1626); // 点击"签到领京豆"
  sleep(2000);
}

// 执行签到
function signIn() {
  log("开始执行签到操作");
  
  // 等待签到按钮出现
  let signButton = text("签到").findOne(3000);
  if (signButton) {
    log("找到签到按钮，点击签到");
    signButton.click();
    sleep(2000);
    
    // 检查是否签到成功
    if (textContains("签到成功").exists() || textContains("已连续签到").exists()) {
      log("签到成功");
    } else {
      log("未检测到签到成功提示，可能出现异常");
    }
  } else {
    log("未找到签到按钮，检查是否已经签到");
    
    // 检查是否已经签到
    if (textContains("已签到").exists() || textContains("已连续签到").exists()) {
      log("今日已签到");
    } else {
      log("未找到签到按钮且未检测到已签到状态，可能页面加载异常");
    }
  }
  
  // 尝试关闭可能出现的弹窗
  closePopups();
  
  // 尝试领取额外奖励
  collectExtraRewards();
  
  log("签到操作执行完毕");
}

function closePopups() {
  log("尝试关闭可能的弹窗");
  
  // 常见的关闭按钮文本
  let closeTexts = ["关闭", "我知道了", "朕知道了"];
  
  for (let text of closeTexts) {
    let closeButton = textContains(text).findOne(1000);
    if (closeButton) {
      log("找到弹窗，正在关闭");
      closeButton.click();
      sleep(1000);
    }
  }
}

function collectExtraRewards() {
  log("尝试领取额外奖励");
  
  // 查找并点击可能的额外奖励按钮
  let extraRewardButtons = textMatches(/(领取奖励|领取京豆|摇京豆)/).find();
  for (let button of extraRewardButtons) {
    log("发现额外奖励，正在领取");
    button.click();
    sleep(2000);
  }
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
