260228
Node.jsを使ったネットゲームサンプル

環境セットアップ
(1)nvmインストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash


反映
source ~/.bashrc

確認
nvm --version


(2)Node.jsインストール
nvm install --lts
確認

node -v
npm -v


----
ローカルで実行するには
npm install（最初の１回だけでよい？）
npm start

ブラウザで
http://localhost:3000

---
TODO
STLなどの３Dデータを読み込んで表示
全方向操縦

