ilesnik = new Image();
ilesnik.src = 'https://static.wikia.nocookie.net/modistalker/images/b/bb/%D0%9B%D0%B5%D1%81%D0%BD%D0%B8%D0%BA.png/revision/latest?cb=20200216052819&path-prefix=ru';
ctx = canvas.getContext("2d");
leafs = [0,1,0];
leaf = 100;
dleafs = (middle,stovbur) => {
  ctx.fillStyle='green';
  for(i = 0; i < leafs.length; i++)
    ctx.fillRect(leafs[i]?middle+stovbur:middle-stovbur-leaf,
        i*leaf,leaf,leaf);
};
lesnik = 1;
lesnikw = leaf;
dlesnik = (middle,stovbur) => {
    ctx.drawImage(ilesnik,lesnik?middle+
      stovbur:middle-stovbur-lesnikw,
        3*leaf,lesnikw,lesnikw);
  };
frame = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,600,400);
  brown = 'rgb(150,75,0)';
  ctx.fillStyle = brown;
  middle = 300;
  stovbur = 30;
  ctx.fillRect(middle - stovbur,0,
    stovbur*2,400);
  dleafs(middle,stovbur);
  dlesnik(middle,stovbur);
};
gleaf = () => {
  return Math.random()>0.5?1:0;
};
mleafs = () => {
  for(i = leafs.length-1; i > 0; i--)
    leafs[i] = leafs[i-1];
  leafs[0] = gleaf();
};
score = 0;
start = ()=> {
  score = 0;
  htmlscore.text="score: 0";
  lesnik = gleaf();
  for(i = 0; i < 3; i++)
    leafs[i] = gleaf();
  frame();
};
document.onkeydown = (e) => {
    left = right = false;
    if(e.code == 'ArrowLeft')
      left = true;
    if(e.code == 'ArrowRight')
      right = true;
    if(left) lesnik = 0;
    if(right) lesnik = 1;
    if(left || right) {
      if(lesnik==leafs[2]) {
        alert('gameover');
        start();
        return;
      }
      score++;
      htmlscore.text="score: " + score;
      mleafs();
      frame();
    }
  };
setTimeout(start,100);
