/**
 * @创建码农: pr
 * @创建日期: 2019-12-26 19:47:02
 * @最近更新: pr
 * @更新时间: 2019-12-26 19:47:02
 * @文件描述: 启动项文件
 */

const Koa = require('koa');
const sha1 = require('sha1');

// 配置文件
const config = {
  wechat: {
    appID: 'wxb284d7a53fa2da16',
    appSecret: '24af419d8f6c997b5582fd46eafb377c',
    token: 'ruizhengyunpr840690384'
  }
};
const PORT = 1989;
const app = new Koa();

// 中间件
app.use(function*(next) {
  console.log('query', this.query);

  const token = config.wechat.token;
  const signature = this.query.signature;
  const nonce = this.query.nonce;
  const timestamp = this.query.timestamp;
  const echostr = this.query.echostr;
  const str = [token, timestamp, nonce].sort().join('');
  const sha = sha1(str);

  if (sha === signature) {
    this.body = echostr + '';
  } else {
    this.body = 'wrong';
  }
});

app.listen(PORT);
console.log(`正在监听：${PORT}`);

app.listen();
