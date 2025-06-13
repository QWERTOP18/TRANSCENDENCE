## Swagger

last update 06/13
[document](https://docs.nestjs.com/openapi/introduction)

visit🏃‍♀️ http://localhost:3001/api/v1/docs

## npm

--save-dev の意味は：
**「このパッケージを開発用（devDependencies）としてインストールする」**という指定

## prisma

[document](https://docs.nestjs.com/recipes/prisma)

Prisma（プリズマ）は、TypeScript/JavaScript 向けの ORM（Object-Relational Mapping）ツールです。データベースとアプリケーションコードの橋渡しをしてくれるもので、SQLを書かずにデータベース操作を行えるようになります。

migrate方法

```sh
npx prisma migrate dev --name hoge
```

databaseに接続できているか確認するようのエンドポイントを追加した`api/v1/test-db`

## ELK stack

last update 06/13

とりあえずdocker-composeにそれぞれのサービスをかいて動くようにしたが、、、
http://localhost:5601/　にアクセスした後データの見方がわからなかった。

NestJSの方では、loggerディレクトリを作成してapp-controllerにメンバーとして渡したが、serviceを作るときは毎回メンバーとして渡さないといけないので、抽象クラスを作った方が良さそう？

## DTO

middlewareでvalidationしなくてもvalidationPipeを使用すると自動的にやってくれる。便利ｽｷﾞﾙﾈΣ੧(❛□❛✿)

```ts
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // DTOにないプロパティを削除
    forbidNonWhitelisted: true, // DTOにないプロパティがあると400エラー
    transform: true, // 自動でDTO型に変換
  })
);
```

## ルートのマッチング順序

例えば、以下のようなルート定義があった場合

```ts
@Get(':id')
@Get('search')
```

このとき、リクエスト /search?query=foo は

まず :id の動的ルートにマッチしようとし、

:id = 'search' と解釈されてしまう！！！
