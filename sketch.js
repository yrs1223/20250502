let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#bde0fe'); // 設定背景顏色

  // 初始化攝影機
  capture = createCapture(VIDEO, function(stream) {
    console.log("攝影機已啟動");
  });
  capture.size(windowWidth * 0.6, windowHeight * 0.6); // 設定影像寬高為視窗大小的60%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與攝影機畫面大小相同的圖形內容
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.background(0); // 設定背景為黑色
}

function draw() {
  background('#bde0fe'); // 確保背景顏色持續更新

  if (capture.loadedmetadata) { // 確保攝影機已載入
    // 更新 overlayGraphics
    overlayGraphics.clear();
    overlayGraphics.background(0); // 黑色背景
    for (let x = 0; x < capture.width; x += 20) {
      for (let y = 0; y < capture.height; y += 20) {
        let col = capture.get(x, y); // 取得 capture 對應位置的顏色
        overlayGraphics.fill(col);
        overlayGraphics.noStroke();
        overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形
      }
    }

    // 顯示攝影機畫面
    translate((windowWidth + capture.width) / 2, (windowHeight - capture.height) / 2); // 移動畫布原點到影像中心
    scale(-1, 1); // 水平翻轉畫面
    image(capture, 0, 0); // 繪製影像

    // 顯示 overlayGraphics 在攝影機畫面上方
    image(overlayGraphics, 0, 0);
  } else {
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("正在載入攝影機...", width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}
