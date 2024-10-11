cardList = []; //全カードのファイル名を保存しておく配列
enemy = []; //敵のカードの番号を保存しておく配列
my = []; //自分のカードの番号を保存しておく配列
no = []; //シャッフルをする前の配列を生成
startFlg = false; //待ちの状態か、ゲーム中かのフラグ

//no配列に0～51までの連番を代入-----------------------------------------------------
for (i = 0; i < 52; i++) {
  no[i] = i;
}

//全52枚のトランプのファイル名のリストを作成----------------------------------------
cnt = 0;
for (i = 1; i <= 13; i++) {
  cardList[cnt++] = "images/c" + String(i).padStart(2, "0") + ".png";
}
for (i = 1; i <= 13; i++) {
  cardList[cnt++] = "images/d" + String(i).padStart(2, "0") + ".png";
}
for (i = 1; i <= 13; i++) {
  cardList[cnt++] = "images/h" + String(i).padStart(2, "0") + ".png";
}
for (i = 1; i <= 13; i++) {
  cardList[cnt++] = "images/s" + String(i).padStart(2, "0") + ".png";
}
//---------------------------------------------------------------------------

document.querySelector(".startButton").disabled = false;
document.querySelector(".finalButton").disabled = true;

//開始処理-------------------------------------------------------------------------------
function start() {
  startFlg = true;
  no = shuffle(no);
  enemyCnt = 0;
  myCnt = 0;
  cnt = 0;
  document.querySelector(".enemyResult").style.display = "none";
  document.querySelector(".myResult").style.display = "none";

  //カードを全て非表示にする
  for (i = 0; i <= 6; i++) {
    document.querySelector(".enemy" + i).style.display = "none";
    document.querySelector(".my" + i).style.display = "none";
  }
  document.querySelector(".startButton").disabled = true;
  document.querySelector(".finalButton").disabled = false;
  document.querySelector(".enemy0").style.display = "block";
  document.querySelector(".enemy1").style.display = "block";
  document.querySelector(".my0").style.display = "block";
  document.querySelector(".my1").style.display = "block";

  //敵のカードと自分のカードを交互に2枚引く
  enemy[enemyCnt++] = no[cnt++];
  my[myCnt++] = no[cnt++];
  enemy[enemyCnt++] = no[cnt++];
  my[myCnt++] = no[cnt++];

  //敵のカードを表示
  document.querySelector(".enemy0").src = cardList[enemy[0]];
  document.querySelector(".enemy1").src = cardList[enemy[1]];

  //自分のカードを表示
  document.querySelector(".my0").src = cardList[my[0]];
  document.querySelector(".my1").src = cardList[my[1]];

  enemyCalc(); //敵カードの合計を計算
  myCalc(); //自分のカードの合計を計算
}
//判定処理-----------------------------------------------------------------------------------
function judge() {
  startFlg = false;
  if (enemyTotal > myTotal) {
    document.querySelector(".enemyResult").innerHTML = "Win";
    document.querySelector(".enemyResult").style.color = "Yellow";
    document.querySelector(".myResult").innerHTML = "Lose";
    document.querySelector(".myResult").style.color = "red";
  } else if (enemyTotal < myTotal) {
    document.querySelector(".enemyResult").innerHTML = "Lose";
    document.querySelector(".enemyResult").style.color = "red";
    document.querySelector(".myResult").innerHTML = "Win";
    document.querySelector(".myResult").style.color = "yellow";
  } else if (enemyTotal == myTotal) {
    document.querySelector(".myResult").innerHTML = "Draw";
    document.querySelector(".myResult").style.color = "blue";
    document.querySelector(".enemyResult").innerHTML = "Draw";
    document.querySelector(".enemyResult").style.color = "blue";
  }
  document.querySelector(".enemyResult").style.display = "block";
  document.querySelector(".myResult").style.display = "block";
  document.querySelector(".startButton").disabled = false;
  document.querySelector(".finalButton").disabled = true;
}
//敵のカードを引く処理-----------------------------------------------------------------------------
function enemyDraw() {
  if (enemyCnt < 6 && enemyTotal < 17) {
    enemy[enemyCnt] = no[cnt];
    document.querySelector(".enemy" + enemyCnt).src = cardList[enemy[enemyCnt]];
    document.querySelector(".enemy" + enemyCnt).style.display = "block";
    enemyCnt++;
    cnt++;

    enemyCalc(); //敵カードの合計を計算

    //もしバーストしてしまったら
    if (enemyTotal > 21) {
      document.querySelector(".enemyResult").innerHTML = "Bust";
      document.querySelector(".enemyResult").style.display = "block";
      document.querySelector(".enemyResult").style.color = "red";
      document.querySelector(".myResult").innerHTML = "Win";
      document.querySelector(".myResult").style.display = "block";
      document.querySelector(".myResult").style.color = "yellow";
      document.querySelector(".startButton").disabled = false;
      document.querySelector(".finalButton").disabled = true;
      startFlg = false;
    }
  }
}
//自分のカードを引く処理-------------------------------------------------------------------------
function myDraw() {
  if (myCnt < 6 && myTotal <= 21) {
    my[myCnt] = no[cnt];
    document.querySelector(".my" + myCnt).src = cardList[my[myCnt]];
    document.querySelector(".my" + myCnt).style.display = "block";
    myCnt++;
    cnt++;

    myCalc(); //自分のカードの合計を計算

    //もしバーストしてしまったら
    if (myTotal > 21) {
      document.querySelector(".enemyResult").innerHTML = "Win";
      document.querySelector(".enemyResult").style.display = "block";
      document.querySelector(".enemyResult").style.color = "yellow";
      document.querySelector(".myResult").innerHTML = "Bust";
      document.querySelector(".myResult").style.display = "block";
      document.querySelector(".myResult").style.color = "red";
      document.querySelector(".startButton").disabled = false;
      document.querySelector(".finalButton").disabled = true;
      startFlg = false;
    }
  }
}
//敵カードの合計を計算------------------------------------------------------------------
function enemyCalc() {
  enemyTotal = 0;
  for (i = 0; i < enemyCnt; i++) {
    enemyTotal += Math.min(10, (enemy[i] % 13) + 1);
  }
  for (i = 0; i < enemyCnt; i++) {
    if ((enemy[i] % 13) + 1 == 1) {
      if (enemyTotal <= 11) {
        enemyTotal += 10;
      }
    }
  }
  document.querySelector(".enemyTotal").innerHTML = enemyTotal;
}
//自分のカードの合計を計算-------------------------------------------------------------------
function myCalc() {
  myTotal = 0;
  for (i = 0; i < myCnt; i++) {
    myTotal += Math.min(10, (my[i] % 13) + 1);
  }
  for (i = 0; i < myCnt; i++) {
    if ((my[i] % 13) + 1 == 1) {
      if (myTotal <= 11) {
        myTotal += 10;
      }
    }
  }
  document.querySelector(".myTotal").innerHTML = myTotal;
}
//カードを引く処理--------------------------------------------------------------------------------
function draw() {
  if (startFlg == true) {
    myDraw();
    enemyDraw();
  }
}
//シャッフル関数化-----------------------------------------------------------------------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let r = Math.floor(Math.random() * i);
    [array[i], array[r]] = [array[r], array[i]];
  }
  return array;
}
