import { IMessage } from "../models/interfaces/IMessage";


export class MailTemplate {
  static subjectActiveAccount = "Xác Nhận Email Của Bạn"
  static subjectOrderSuccess = "Đặt Hàng Thành Công"
  static subjectOrder = "Đơn Hàng Từ Customer"
  static subjectMessageFromCustomer = "Bạn có tin nhắn từ khách hàng"
  static subjectResetPasswordSuccess = "Thay đổi mật khẩu"
  
  static activeAccount(url: any): string {
    return (
      "<!doctype html>" +
      "<html>" +
      "  <head>" +
      '    <meta name="viewport" content="width=device-width" />' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
      "    <style>" +
      "      /* -------------------------------------" +
      "          GLOBAL RESETS" +
      "      ------------------------------------- */" +
      "      img {" +
      "        border: none;" +
      "        -ms-interpolation-mode: bicubic;" +
      "        max-width: 100%; }" +
      "      body {" +
      "        background-color: #f6f6f6;" +
      "        font-family: sans-serif;" +
      "        -webkit-font-smoothing: antialiased;" +
      "        font-size: 14px;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        padding: 0; " +
      "        -ms-text-size-adjust: 100%;" +
      "        -webkit-text-size-adjust: 100%; }" +
      "      table {" +
      "        border-collapse: separate;" +
      "        mso-table-lspace: 0pt;" +
      "        mso-table-rspace: 0pt;" +
      "        width: 100%; }" +
      "        table td {" +
      "          font-family: sans-serif;" +
      "          font-size: 14px;" +
      "          vertical-align: top; }" +
      "      /* -------------------------------------" +
      "          BODY & CONTAINER" +
      "      ------------------------------------- */" +
      "      .body {" +
      "        background-color: #f6f6f6;" +
      "        width: 100%; }" +
      "      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */" +
      "      .container {" +
      "        display: block;" +
      "        Margin: 0 auto !important;" +
      "        /* makes it centered */" +
      "        max-width: 580px;" +
      "        padding: 10px;" +
      "        width: 580px; }" +
      "      /* This should also be a block element, so that it will fill 100% of the .container */" +
      "      .content {" +
      "        box-sizing: border-box;" +
      "        display: block;" +
      "        Margin: 0 auto;" +
      "        max-width: 580px;" +
      "        padding: 10px; }" +
      "      /* -------------------------------------" +
      "          HEADER, FOOTER, MAIN" +
      "      ------------------------------------- */" +
      "      .main {" +
      "        background: #fff;" +
      "        border-radius: 3px;" +
      "        width: 100%; }" +
      "      .wrapper {" +
      "        box-sizing: border-box;" +
      "        padding: 20px; }" +
      "      .footer {" +
      "        clear: both;" +
      "        padding-top: 10px;" +
      "        text-align: center;" +
      "        width: 100%; }" +
      "        .footer td," +
      "        .footer p," +
      "        .footer span," +
      "        .footer a {" +
      "          color: #999999;" +
      "          font-size: 12px;" +
      "          text-align: center; }" +
      "      /* -------------------------------------" +
      "          TYPOGRAPHY" +
      "      ------------------------------------- */" +
      "      h1," +
      "      h2," +
      "      h3," +
      "      h4 {" +
      "        color: #000000;" +
      "        font-family: sans-serif;" +
      "        font-weight: 400;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        Margin-bottom: 30px; }" +
      "      h1 {" +
      "        font-size: 35px;" +
      "        font-weight: 300;" +
      "        text-align: center;" +
      "        text-transform: capitalize; }" +
      "      p," +
      "      ul," +
      "      ol {" +
      "        font-family: sans-serif;" +
      "        font-size: 14px;" +
      "        font-weight: normal;" +
      "        margin: 0;" +
      "        Margin-bottom: 15px; }" +
      "        p li," +
      "        ul li," +
      "        ol li {" +
      "          list-style-position: inside;" +
      "          margin-left: 5px; }" +
      "      a {" +
      "        color: #3498db;" +
      "        text-decoration: underline; }" +
      "      /* -------------------------------------" +
      "          BUTTONS" +
      "      ------------------------------------- */" +
      "      .btn {" +
      "        box-sizing: border-box;" +
      "        width: 100%; }" +
      "        .btn > tbody > tr > td {" +
      "          padding-bottom: 15px; }" +
      "        .btn table {" +
      "          width: auto; }" +
      "        .btn table td {" +
      "          background-color: #ffffff;" +
      "          border-radius: 5px;" +
      "          text-align: center; }" +
      "        .btn a {" +
      "          background-color: #ffffff;" +
      "          border: solid 1px #3498db;" +
      "          border-radius: 5px;" +
      "          box-sizing: border-box;" +
      "          color: #3498db;" +
      "          cursor: pointer;" +
      "          display: inline-block;" +
      "          font-size: 14px;" +
      "          font-weight: bold;" +
      "          margin: 0;" +
      "          padding: 12px 25px;" +
      "          text-decoration: none;" +
      "          text-transform: capitalize; }" +
      "      .btn-primary table td {" +
      "        background-color: #3498db; }" +
      "      .btn-primary a {" +
      "        background-color: #3498db;" +
      "        border-color: #3498db;" +
      "        color: #ffffff; }" +
      "      /* -------------------------------------" +
      "          OTHER STYLES THAT MIGHT BE USEFUL" +
      "      ------------------------------------- */" +
      "      .last {" +
      "        margin-bottom: 0; }" +
      "      .first {" +
      "        margin-top: 0; }" +
      "      .align-center {" +
      "        text-align: center; }" +
      "      .align-right {" +
      "        text-align: right; }" +
      "      .align-left {" +
      "        text-align: left; }" +
      "      .clear {" +
      "        clear: both; }" +
      "      .mt0 {" +
      "        margin-top: 0; }" +
      "      .mb0 {" +
      "        margin-bottom: 0; }" +
      "      .preheader {" +
      "        color: transparent;" +
      "        display: none;" +
      "        height: 0;" +
      "        max-height: 0;" +
      "        max-width: 0;" +
      "        opacity: 0;" +
      "        overflow: hidden;" +
      "        mso-hide: all;" +
      "        visibility: hidden;" +
      "        width: 0; }" +
      "      .powered-by a {" +
      "        text-decoration: none; }" +
      "      hr {" +
      "        border: 0;" +
      "        border-bottom: 1px solid #f6f6f6;" +
      "        Margin: 20px 0; }" +
      "      /* -------------------------------------" +
      "          RESPONSIVE AND MOBILE FRIENDLY STYLES" +
      "      ------------------------------------- */" +
      "      @media only screen and (max-width: 620px) {" +
      "        table[class=body] h1 {" +
      "          font-size: 28px !important;" +
      "          margin-bottom: 10px !important; }" +
      "        table[class=body] p," +
      "        table[class=body] ul," +
      "        table[class=body] ol," +
      "        table[class=body] td," +
      "        table[class=body] span," +
      "        table[class=body] a {" +
      "          font-size: 16px !important; }" +
      "        table[class=body] .wrapper," +
      "        table[class=body] .article {" +
      "          padding: 10px !important; }" +
      "        table[class=body] .content {" +
      "          padding: 0 !important; }" +
      "        table[class=body] .container {" +
      "          padding: 0 !important;" +
      "          width: 100% !important; }" +
      "        table[class=body] .main {" +
      "          border-left-width: 0 !important;" +
      "          border-radius: 0 !important;" +
      "          border-right-width: 0 !important; }" +
      "        table[class=body] .btn table {" +
      "          width: 100% !important; }" +
      "        table[class=body] .btn a {" +
      "          width: 100% !important; }" +
      "        table[class=body] .img-responsive {" +
      "          height: auto !important;" +
      "          max-width: 100% !important;" +
      "          width: auto !important; }}" +
      "      @media all {" +
      "        .ExternalClass {" +
      "          width: 100%; }" +
      "        .ExternalClass," +
      "        .ExternalClass p," +
      "        .ExternalClass span," +
      "        .ExternalClass font," +
      "        .ExternalClass td," +
      "        .ExternalClass div {" +
      "          line-height: 100%; }" +
      "        .apple-link a {" +
      "          color: inherit !important;" +
      "          font-family: inherit !important;" +
      "          font-size: inherit !important;" +
      "          font-weight: inherit !important;" +
      "          line-height: inherit !important;" +
      "          text-decoration: none !important; } " +
      "        .btn-primary table td:hover {" +
      "          background-color: #34495e !important; }" +
      "        .btn-primary a:hover {" +
      "          background-color: #34495e !important;" +
      "          border-color: #34495e !important; } }" +
      "    </style>" +
      "  </head>" +
      '  <body class="">' +
      '    <table border="0" cellpadding="0" cellspacing="0" class="body">' +
      "      <tr>" +
      "        <td> </td>" +
      '        <td class="container">' +
      '          <div class="content">' +
      '            <table class="main">' +
      "" +
      "              <!-- START MAIN CONTENT AREA -->" +
      "              <tr>" +
      '                <td class="wrapper">' +
      '                  <table border="0" cellpadding="0" cellspacing="0">' +
      "                    <tr>" +
      "                      <td>" +
      "                        <h1>Xác Nhận Email Của Bạn</h1>" +
      "                        <h2>Bạn chỉ còn một bước nữa</h2>" +
      "                    " +
      '                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">' +
      "                          <tbody>" +
      "                            <tr>" +
      '                              <td align="left">' +
      '                                <table border="0" cellpadding="0" cellspacing="0">' +
      "                                  <tbody>" +
      "                                    <tr>" +
      '                                      <td> <a href="http://'+url+'" target="_blank">Xác nhận</a> </td>' +
      "                                    </tr>" +
      "                                  </tbody>" +
      "                                </table>" +
      "                              </td>" +
      "                            </tr>" +
      "                          </tbody>" +
      "                        </table>" +
      "                        " +
      "          <p>Chúng tôi thực sự vui mừng vì bạn đã tham gia cùng chúng tôi! Để bắt đầu, vui lòng kích hoạt tài khoản mới của bạn.</p>" +
      "                      </td>" +
      "                    </tr>" +
      "                  </table>" +
      "                </td>" +
      "              </tr>" +
      "" +
      "            <!-- END MAIN CONTENT AREA -->" +
      "            </table>" +
      "" +
      "     " +
      "            " +
      "          <!-- END CENTERED WHITE CONTAINER -->" +
      "          </div>" +
      "        </td>" +
      "        <td> </td>" +
      "      </tr>" +
      "    </table>" +
      "  </body>" +
      "</html>"
    );
  }

  static orderSuccess(urlHost) : String{
    return  (
      "<!doctype html>" +
      "<html>" +
      "  <head>" +
      '    <meta name="viewport" content="width=device-width" />' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
      "    <style>" +
      "      /* -------------------------------------" +
      "          GLOBAL RESETS" +
      "      ------------------------------------- */" +
      "      img {" +
      "        border: none;" +
      "        -ms-interpolation-mode: bicubic;" +
      "        max-width: 100%; }" +
      "      body {" +
      "        background-color: #f6f6f6;" +
      "        font-family: sans-serif;" +
      "        -webkit-font-smoothing: antialiased;" +
      "        font-size: 14px;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        padding: 0; " +
      "        -ms-text-size-adjust: 100%;" +
      "        -webkit-text-size-adjust: 100%; }" +
      "      table {" +
      "        border-collapse: separate;" +
      "        mso-table-lspace: 0pt;" +
      "        mso-table-rspace: 0pt;" +
      "        width: 100%; }" +
      "        table td {" +
      "          font-family: sans-serif;" +
      "          font-size: 14px;" +
      "          vertical-align: top; }" +
      "      /* -------------------------------------" +
      "          BODY & CONTAINER" +
      "      ------------------------------------- */" +
      "      .body {" +
      "        background-color: #f6f6f6;" +
      "        width: 100%; }" +
      "      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */" +
      "      .container {" +
      "        display: block;" +
      "        Margin: 0 auto !important;" +
      "        /* makes it centered */" +
      "        max-width: 580px;" +
      "        padding: 10px;" +
      "        width: 580px; }" +
      "      /* This should also be a block element, so that it will fill 100% of the .container */" +
      "      .content {" +
      "        box-sizing: border-box;" +
      "        display: block;" +
      "        Margin: 0 auto;" +
      "        max-width: 580px;" +
      "        padding: 10px; }" +
      "      /* -------------------------------------" +
      "          HEADER, FOOTER, MAIN" +
      "      ------------------------------------- */" +
      "      .main {" +
      "        background: #fff;" +
      "        border-radius: 3px;" +
      "        width: 100%; }" +
      "      .wrapper {" +
      "        box-sizing: border-box;" +
      "        padding: 20px; }" +
      "      .footer {" +
      "        clear: both;" +
      "        padding-top: 10px;" +
      "        text-align: center;" +
      "        width: 100%; }" +
      "        .footer td," +
      "        .footer p," +
      "        .footer span," +
      "        .footer a {" +
      "          color: #999999;" +
      "          font-size: 12px;" +
      "          text-align: center; }" +
      "      /* -------------------------------------" +
      "          TYPOGRAPHY" +
      "      ------------------------------------- */" +
      "      h1," +
      "      h2," +
      "      h3," +
      "      h4 {" +
      "        color: #000000;" +
      "        font-family: sans-serif;" +
      "        font-weight: 400;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        Margin-bottom: 30px; }" +
      "      h1 {" +
      "        font-size: 35px;" +
      "        font-weight: 300;" +
      "        text-align: center;" +
      "        text-transform: capitalize; }" +
      "      p," +
      "      ul," +
      "      ol {" +
      "        font-family: sans-serif;" +
      "        font-size: 14px;" +
      "        font-weight: normal;" +
      "        margin: 0;" +
      "        Margin-bottom: 15px; }" +
      "        p li," +
      "        ul li," +
      "        ol li {" +
      "          list-style-position: inside;" +
      "          margin-left: 5px; }" +
      "      a {" +
      "        color: #3498db;" +
      "        text-decoration: underline; }" +
      "      /* -------------------------------------" +
      "          BUTTONS" +
      "      ------------------------------------- */" +
      "      .btn {" +
      "        box-sizing: border-box;" +
      "        width: 100%; }" +
      "        .btn > tbody > tr > td {" +
      "          padding-bottom: 15px; }" +
      "        .btn table {" +
      "          width: auto; }" +
      "        .btn table td {" +
      "          background-color: #ffffff;" +
      "          border-radius: 5px;" +
      "          text-align: center; }" +
      "        .btn a {" +
      "          background-color: #ffffff;" +
      "          border: solid 1px #3498db;" +
      "          border-radius: 5px;" +
      "          box-sizing: border-box;" +
      "          color: #3498db;" +
      "          cursor: pointer;" +
      "          display: inline-block;" +
      "          font-size: 14px;" +
      "          font-weight: bold;" +
      "          margin: 0;" +
      "          padding: 12px 25px;" +
      "          text-decoration: none;" +
      "          text-transform: capitalize; }" +
      "      .btn-primary table td {" +
      "        background-color: #3498db; }" +
      "      .btn-primary a {" +
      "        background-color: #3498db;" +
      "        border-color: #3498db;" +
      "        color: #ffffff; }" +
      "      /* -------------------------------------" +
      "          OTHER STYLES THAT MIGHT BE USEFUL" +
      "      ------------------------------------- */" +
      "      .last {" +
      "        margin-bottom: 0; }" +
      "      .first {" +
      "        margin-top: 0; }" +
      "      .align-center {" +
      "        text-align: center; }" +
      "      .align-right {" +
      "        text-align: right; }" +
      "      .align-left {" +
      "        text-align: left; }" +
      "      .clear {" +
      "        clear: both; }" +
      "      .mt0 {" +
      "        margin-top: 0; }" +
      "      .mb0 {" +
      "        margin-bottom: 0; }" +
      "      .preheader {" +
      "        color: transparent;" +
      "        display: none;" +
      "        height: 0;" +
      "        max-height: 0;" +
      "        max-width: 0;" +
      "        opacity: 0;" +
      "        overflow: hidden;" +
      "        mso-hide: all;" +
      "        visibility: hidden;" +
      "        width: 0; }" +
      "      .powered-by a {" +
      "        text-decoration: none; }" +
      "      hr {" +
      "        border: 0;" +
      "        border-bottom: 1px solid #f6f6f6;" +
      "        Margin: 20px 0; }" +
      "      /* -------------------------------------" +
      "          RESPONSIVE AND MOBILE FRIENDLY STYLES" +
      "      ------------------------------------- */" +
      "      @media only screen and (max-width: 620px) {" +
      "        table[class=body] h1 {" +
      "          font-size: 28px !important;" +
      "          margin-bottom: 10px !important; }" +
      "        table[class=body] p," +
      "        table[class=body] ul," +
      "        table[class=body] ol," +
      "        table[class=body] td," +
      "        table[class=body] span," +
      "        table[class=body] a {" +
      "          font-size: 16px !important; }" +
      "        table[class=body] .wrapper," +
      "        table[class=body] .article {" +
      "          padding: 10px !important; }" +
      "        table[class=body] .content {" +
      "          padding: 0 !important; }" +
      "        table[class=body] .container {" +
      "          padding: 0 !important;" +
      "          width: 100% !important; }" +
      "        table[class=body] .main {" +
      "          border-left-width: 0 !important;" +
      "          border-radius: 0 !important;" +
      "          border-right-width: 0 !important; }" +
      "        table[class=body] .btn table {" +
      "          width: 100% !important; }" +
      "        table[class=body] .btn a {" +
      "          width: 100% !important; }" +
      "        table[class=body] .img-responsive {" +
      "          height: auto !important;" +
      "          max-width: 100% !important;" +
      "          width: auto !important; }}" +
      "      @media all {" +
      "        .ExternalClass {" +
      "          width: 100%; }" +
      "        .ExternalClass," +
      "        .ExternalClass p," +
      "        .ExternalClass span," +
      "        .ExternalClass font," +
      "        .ExternalClass td," +
      "        .ExternalClass div {" +
      "          line-height: 100%; }" +
      "        .apple-link a {" +
      "          color: inherit !important;" +
      "          font-family: inherit !important;" +
      "          font-size: inherit !important;" +
      "          font-weight: inherit !important;" +
      "          line-height: inherit !important;" +
      "          text-decoration: none !important; } " +
      "        .btn-primary table td:hover {" +
      "          background-color: #34495e !important; }" +
      "        .btn-primary a:hover {" +
      "          background-color: #34495e !important;" +
      "          border-color: #34495e !important; } }" +
      "    </style>" +
      "  </head>" +
      '  <body class="">' +
      '    <table border="0" cellpadding="0" cellspacing="0" class="body">' +
      "      <tr>" +
      "        <td> </td>" +
      '        <td class="container">' +
      '          <div class="content">' +
      '            <table class="main">' +
      "" +
      "              <!-- START MAIN CONTENT AREA -->" +
      "              <tr>" +
      '                <td class="wrapper">' +
      '                  <table border="0" cellpadding="0" cellspacing="0">' +
      "                    <tr>" +
      "                      <td>" +
      '                        <h1>Bạn Đã Đặt Hàng Thành Công!</h1>\n' + 
      '                        <p>Chúng tôi sẽ liên hệ bạn để xác nhận đơn hàng trong thời gian sớm nhất. Xin cảm ơn!</p>\n' + 
      "                    " +
      '                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">' +
      "                          <tbody>" +
      "                            <tr>" +
      '                              <td align="left">' +
      '                                <table border="0" cellpadding="0" cellspacing="0">' +
      "                                  <tbody>" +
      "                                    <tr>" +
      '                                      <td> <a href="http://'+urlHost+'" target="_blank">Tiếp tục mua hàng</a> </td>' +
      "                                    </tr>" +
      "                                  </tbody>" +
      "                                </table>" +
      "                              </td>" +
      "                            </tr>" +
      "                          </tbody>" +
      "                        </table>" +
      "                        " +
      "                      </td>" +
      "                    </tr>" +
      "                  </table>" +
      "                </td>" +
      "              </tr>" +
      "" +
      "            <!-- END MAIN CONTENT AREA -->" +
      "            </table>" +
      "" +
      "     " +
      "            " +
      "          <!-- END CENTERED WHITE CONTAINER -->" +
      "          </div>" +
      "        </td>" +
      "        <td></td>" +
      "      </tr>" +
      "    </table>" +
      "  </body>" +
      "</html>"
    )
  }

  static orderFromCustomer(urlHost, orderId) : String{
    return  (
      "<!doctype html>" +
      "<html>" +
      "  <head>" +
      '    <meta name="viewport" content="width=device-width" />' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
      "    <style>" +
      "      /* -------------------------------------" +
      "          GLOBAL RESETS" +
      "      ------------------------------------- */" +
      "      img {" +
      "        border: none;" +
      "        -ms-interpolation-mode: bicubic;" +
      "        max-width: 100%; }" +
      "      body {" +
      "        background-color: #f6f6f6;" +
      "        font-family: sans-serif;" +
      "        -webkit-font-smoothing: antialiased;" +
      "        font-size: 14px;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        padding: 0; " +
      "        -ms-text-size-adjust: 100%;" +
      "        -webkit-text-size-adjust: 100%; }" +
      "      table {" +
      "        border-collapse: separate;" +
      "        mso-table-lspace: 0pt;" +
      "        mso-table-rspace: 0pt;" +
      "        width: 100%; }" +
      "        table td {" +
      "          font-family: sans-serif;" +
      "          font-size: 14px;" +
      "          vertical-align: top; }" +
      "      /* -------------------------------------" +
      "          BODY & CONTAINER" +
      "      ------------------------------------- */" +
      "      .body {" +
      "        background-color: #f6f6f6;" +
      "        width: 100%; }" +
      "      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */" +
      "      .container {" +
      "        display: block;" +
      "        Margin: 0 auto !important;" +
      "        /* makes it centered */" +
      "        max-width: 580px;" +
      "        padding: 10px;" +
      "        width: 580px; }" +
      "      /* This should also be a block element, so that it will fill 100% of the .container */" +
      "      .content {" +
      "        box-sizing: border-box;" +
      "        display: block;" +
      "        Margin: 0 auto;" +
      "        max-width: 580px;" +
      "        padding: 10px; }" +
      "      /* -------------------------------------" +
      "          HEADER, FOOTER, MAIN" +
      "      ------------------------------------- */" +
      "      .main {" +
      "        background: #fff;" +
      "        border-radius: 3px;" +
      "        width: 100%; }" +
      "      .wrapper {" +
      "        box-sizing: border-box;" +
      "        padding: 20px; }" +
      "      .footer {" +
      "        clear: both;" +
      "        padding-top: 10px;" +
      "        text-align: center;" +
      "        width: 100%; }" +
      "        .footer td," +
      "        .footer p," +
      "        .footer span," +
      "        .footer a {" +
      "          color: #999999;" +
      "          font-size: 12px;" +
      "          text-align: center; }" +
      "      /* -------------------------------------" +
      "          TYPOGRAPHY" +
      "      ------------------------------------- */" +
      "      h1," +
      "      h2," +
      "      h3," +
      "      h4 {" +
      "        color: #000000;" +
      "        font-family: sans-serif;" +
      "        font-weight: 400;" +
      "        line-height: 1.4;" +
      "        margin: 0;" +
      "        Margin-bottom: 30px; }" +
      "      h1 {" +
      "        font-size: 35px;" +
      "        font-weight: 300;" +
      "        text-align: center;" +
      "        text-transform: capitalize; }" +
      "      p," +
      "      ul," +
      "      ol {" +
      "        font-family: sans-serif;" +
      "        font-size: 14px;" +
      "        font-weight: normal;" +
      "        margin: 0;" +
      "        Margin-bottom: 15px; }" +
      "        p li," +
      "        ul li," +
      "        ol li {" +
      "          list-style-position: inside;" +
      "          margin-left: 5px; }" +
      "      a {" +
      "        color: #3498db;" +
      "        text-decoration: underline; }" +
      "      /* -------------------------------------" +
      "          BUTTONS" +
      "      ------------------------------------- */" +
      "      .btn {" +
      "        box-sizing: border-box;" +
      "        width: 100%; }" +
      "        .btn > tbody > tr > td {" +
      "          padding-bottom: 15px; }" +
      "        .btn table {" +
      "          width: auto; }" +
      "        .btn table td {" +
      "          background-color: #ffffff;" +
      "          border-radius: 5px;" +
      "          text-align: center; }" +
      "        .btn a {" +
      "          background-color: #ffffff;" +
      "          border: solid 1px #3498db;" +
      "          border-radius: 5px;" +
      "          box-sizing: border-box;" +
      "          color: #3498db;" +
      "          cursor: pointer;" +
      "          display: inline-block;" +
      "          font-size: 14px;" +
      "          font-weight: bold;" +
      "          margin: 0;" +
      "          padding: 12px 25px;" +
      "          text-decoration: none;" +
      "          text-transform: capitalize; }" +
      "      .btn-primary table td {" +
      "        background-color: #3498db; }" +
      "      .btn-primary a {" +
      "        background-color: #3498db;" +
      "        border-color: #3498db;" +
      "        color: #ffffff; }" +
      "      /* -------------------------------------" +
      "          OTHER STYLES THAT MIGHT BE USEFUL" +
      "      ------------------------------------- */" +
      "      .last {" +
      "        margin-bottom: 0; }" +
      "      .first {" +
      "        margin-top: 0; }" +
      "      .align-center {" +
      "        text-align: center; }" +
      "      .align-right {" +
      "        text-align: right; }" +
      "      .align-left {" +
      "        text-align: left; }" +
      "      .clear {" +
      "        clear: both; }" +
      "      .mt0 {" +
      "        margin-top: 0; }" +
      "      .mb0 {" +
      "        margin-bottom: 0; }" +
      "      .preheader {" +
      "        color: transparent;" +
      "        display: none;" +
      "        height: 0;" +
      "        max-height: 0;" +
      "        max-width: 0;" +
      "        opacity: 0;" +
      "        overflow: hidden;" +
      "        mso-hide: all;" +
      "        visibility: hidden;" +
      "        width: 0; }" +
      "      .powered-by a {" +
      "        text-decoration: none; }" +
      "      hr {" +
      "        border: 0;" +
      "        border-bottom: 1px solid #f6f6f6;" +
      "        Margin: 20px 0; }" +
      "      /* -------------------------------------" +
      "          RESPONSIVE AND MOBILE FRIENDLY STYLES" +
      "      ------------------------------------- */" +
      "      @media only screen and (max-width: 620px) {" +
      "        table[class=body] h1 {" +
      "          font-size: 28px !important;" +
      "          margin-bottom: 10px !important; }" +
      "        table[class=body] p," +
      "        table[class=body] ul," +
      "        table[class=body] ol," +
      "        table[class=body] td," +
      "        table[class=body] span," +
      "        table[class=body] a {" +
      "          font-size: 16px !important; }" +
      "        table[class=body] .wrapper," +
      "        table[class=body] .article {" +
      "          padding: 10px !important; }" +
      "        table[class=body] .content {" +
      "          padding: 0 !important; }" +
      "        table[class=body] .container {" +
      "          padding: 0 !important;" +
      "          width: 100% !important; }" +
      "        table[class=body] .main {" +
      "          border-left-width: 0 !important;" +
      "          border-radius: 0 !important;" +
      "          border-right-width: 0 !important; }" +
      "        table[class=body] .btn table {" +
      "          width: 100% !important; }" +
      "        table[class=body] .btn a {" +
      "          width: 100% !important; }" +
      "        table[class=body] .img-responsive {" +
      "          height: auto !important;" +
      "          max-width: 100% !important;" +
      "          width: auto !important; }}" +
      "      @media all {" +
      "        .ExternalClass {" +
      "          width: 100%; }" +
      "        .ExternalClass," +
      "        .ExternalClass p," +
      "        .ExternalClass span," +
      "        .ExternalClass font," +
      "        .ExternalClass td," +
      "        .ExternalClass div {" +
      "          line-height: 100%; }" +
      "        .apple-link a {" +
      "          color: inherit !important;" +
      "          font-family: inherit !important;" +
      "          font-size: inherit !important;" +
      "          font-weight: inherit !important;" +
      "          line-height: inherit !important;" +
      "          text-decoration: none !important; } " +
      "        .btn-primary table td:hover {" +
      "          background-color: #34495e !important; }" +
      "        .btn-primary a:hover {" +
      "          background-color: #34495e !important;" +
      "          border-color: #34495e !important; } }" +
      "    </style>" +
      "  </head>" +
      '  <body class="">' +
      '    <table border="0" cellpadding="0" cellspacing="0" class="body">' +
      "      <tr>" +
      "        <td> </td>" +
      '        <td class="container">' +
      '          <div class="content">' +
      '            <table class="main">' +
      "" +
      "              <!-- START MAIN CONTENT AREA -->" +
      "              <tr>" +
      '                <td class="wrapper">' +
      '                  <table border="0" cellpadding="0" cellspacing="0">' +
      "                    <tr>" +
      "                      <td>" +
      '                        <h1>Đơn Hàng!</h1>\n' + 
      '                        <p>Có đơn hàng cần được xác nhận từ phía admin!</p>\n' + 
      "                    " +
      '                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">' +
      "                          <tbody>" +
      "                            <tr>" +
      '                              <td align="left">' +
      '                                <table border="0" cellpadding="0" cellspacing="0">' +
      "                                  <tbody>" +
      "                                    <tr>" +
      '                                      <td> <a href="http://'+urlHost+'/admin/view-order?orderId='+orderId+'" target="_blank">Xem chi tiết</a> </td>' +
      "                                    </tr>" +
      "                                  </tbody>" +
      "                                </table>" +
      "                              </td>" +
      "                            </tr>" +
      "                          </tbody>" +
      "                        </table>" +
      "                        " +
      "                      </td>" +
      "                    </tr>" +
      "                  </table>" +
      "                </td>" +
      "              </tr>" +
      "" +
      "            <!-- END MAIN CONTENT AREA -->" +
      "            </table>" +
      "" +
      "     " +
      "            " +
      "          <!-- END CENTERED WHITE CONTAINER -->" +
      "          </div>" +
      "        </td>" +
      "        <td></td>" +
      "      </tr>" +
      "    </table>" +
      "  </body>" +
      "</html>"
    )
  }

  static messageFromCustomer(message  : IMessage): String {
    var htmlEmail = ""
    if (message.title) {
      htmlEmail = htmlEmail + '<p>Tiêu đề : '+message.title+'</p>'
    }
    if (message.message) {
      htmlEmail = htmlEmail + '</b><p>Nội dung : '+message.message+'</p>'
    }else{
      htmlEmail = htmlEmail + '</b><p>Nội dung : '+message.content+'</p>'
    }
    htmlEmail = htmlEmail +'</b><p>Thông tin khách hàng : </p><ul>'
    if (message.name) {
      htmlEmail = htmlEmail + '</b<li> Tên Khách hàng : '+ message.name +'</li>'
    }

    if (message.email) {
      htmlEmail = htmlEmail + '</b><li> Email : '+ message.email +'</li>'
    }

    if (message.address) {
      htmlEmail = htmlEmail + '</b><li> Địa chỉ : '+ message.address +'</li>'
    }

    if (message.phone) {
      htmlEmail = htmlEmail + '</b><li> Số điện thoại : '+ message.phone +'</li>'
    }

    htmlEmail = htmlEmail +'</ul>'
    return htmlEmail
  }

  static paymentSuccess(urlHost : any, order: any): String{
    var productsHtml = "" 
    var customer = order.customerId

    if (!customer){
      customer = order.billingAddress.email
    }

    if (!customer){
      customer = order.shippingAddress.email
    }

    order.products.forEach((product) => {
      var currentProductInfo = order.productList.find(
        (x) => x._id == product.productId
      );
      var ecommerce = currentProductInfo.ecommerce;
      if (
        product.ecommercePlusId != undefined &&  product.ecommercePlusId != "" &&
        currentProductInfo != null && currentProductInfo.ecommercePlus != null) {
        ecommerce = currentProductInfo.ecommercePlus.find(
          (x) => x._id == product.ecommercePlusId
        );
      }

      var productHtml = '<!-- Item product -->'+
    '                  <tr>'+
    '                    <td class="esdev-adapt-off" align="left"'+
    '                      style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:10px">'+
    '                      <table cellpadding="0" cellspacing="0" class="esdev-mso-table"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">'+
    '                        <tr>'+
    '                          <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">'+
    '                          <td style="padding:0;Margin:0;width:20px"></td>'+
    '                          <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">'+
    '                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">'+
    '                              <tr>'+
    '                                <td align="center" style="padding:0;Margin:0;width:265px">'+
    '                                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                                    <tr>'+
    '                                      <td align="left" style="padding:0;Margin:0">'+
    '                                        <p'+
    '                                          style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                          <strong>'+currentProductInfo.name+'</strong></p>'+
    '                                      </td>'+
    '                                    </tr>'+

    '                                    <tr>'+
    '                                      <td align="left" style="padding:0;Margin:0;padding-top:5px">'+
    '                                        <p'+
    '                                          style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'
                            if (product.adult) {
                              productHtml = productHtml + 'Người lơn: '+product.adult+'<br>'
                            }
                            if (product.children) {
                              productHtml = productHtml + 'Trẻ em:  '+product.children+'<br>'
                            }   
                            if (product.size) {
                              productHtml = productHtml + 'Size: '+product.size+'<br>'
                            }   
                            if (product.color) {
                              productHtml = productHtml + 'Color: '+product.color+'<br>'
                            }   
                            if (product.measures) {
                              productHtml = productHtml + 'Số đo: '+product.measures+'<br>'
                            } 
                            if (product.weight) {
                              productHtml = productHtml + 'Cân nặng: '+product.weight+'<br>'
                            } 
                            if (product.height) {
                              productHtml = productHtml + 'Chiều cao: '+product.height+'<br>'
                            } 
                            if (product.width) {
                              productHtml = productHtml + 'Rộng : '+product.width+'<br>'
                            }                                           
    productHtml = productHtml + '</p>'+
    '                                      </td>'+
    '                                    </tr>'+

    '                                  </table>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                          <td style="padding:0;Margin:0;width:20px"></td>'+
    '                          <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">'+
    '                            <table cellpadding="0" cellspacing="0" class="es-left" align="left"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">'+
    '                              <tr>'+
    '                                <td align="left" style="padding:0;Margin:0;width:80px">'+
    '                                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                                    <tr>'+
    '                                      <td align="center" style="padding:0;Margin:0">'+
    '                                        <p'+
    '                                          style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
                                        product.quantity+'</p>'+
    '                                      </td>'+
    '                                    </tr>'+
    '                                  </table>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                          <td style="padding:0;Margin:0;width:20px"></td>'+
    '                          <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">'+
    '                            <table cellpadding="0" cellspacing="0" class="es-right" align="right"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">'+
    '                              <tr>'+
    '                                <td align="left" style="padding:0;Margin:0;width:85px">'+
    '                                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                                    <tr>'+
    '                                      <td align="right" style="padding:0;Margin:0">'+
    '                                        <p'+
    '                                          style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    ecommerce.price +'</p>'+
    '                                      </td>'+
    '                                    </tr>'+
    '                                  </table>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    '                  <!-- Item product -->'

            productsHtml = productsHtml + productHtml
    });
    

    var myvar = '<!DOCTYPE html'+
    '  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
    '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">'+
    '<head>'+
    '  <meta charset="UTF-8">'+
    '  <meta content="width=device-width, initial-scale=1" name="viewport">'+
    '  <meta name="x-apple-disable-message-reformatting">'+
    '  <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
    '  <meta content="telephone=no" name="format-detection">'+
    '  <title>Payment Success</title>'+
    '  <!--[if (mso 16)]>'+
    '    <style type="text/css">'+
    '    a {text-decoration: none;}'+
    '    </style>'+
    '    <![endif]-->'+
    '  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->'+
    '  <!--[if gte mso 9]>'+
    '<xml>'+
    '    <o:OfficeDocumentSettings>'+
    '    <o:AllowPNG></o:AllowPNG>'+
    '    <o:PixelsPerInch>96</o:PixelsPerInch>'+
    '    </o:OfficeDocumentSettings>'+
    '</xml>'+
    '<![endif]-->'+
    '  <style type="text/css">'+
    '    .rollover:hover .rollover-first {'+
    '      max-height: 0px !important;'+
    '      display: none !important;'+
    '    }'+
    ''+
    '    .rollover:hover .rollover-second {'+
    '      max-height: none !important;'+
    '      display: inline-block !important;'+
    '    }'+
    ''+
    '    .rollover div {'+
    '      font-size: 0px;'+
    '    }'+
    ''+
    '    u~div img+div>div {'+
    '      display: none;'+
    '    }'+
    ''+
    '    #outlook a {'+
    '      padding: 0;'+
    '    }'+
    ''+
    '    span.MsoHyperlink,'+
    '    span.MsoHyperlinkFollowed {'+
    '      color: inherit;'+
    '      mso-style-priority: 99;'+
    '    }'+
    ''+
    '    a.es-button {'+
    '      mso-style-priority: 100 !important;'+
    '      text-decoration: none !important;'+
    '    }'+
    ''+
    '    a[x-apple-data-detectors] {'+
    '      color: inherit !important;'+
    '      text-decoration: none !important;'+
    '      font-size: inherit !important;'+
    '      font-family: inherit !important;'+
    '      font-weight: inherit !important;'+
    '      line-height: inherit !important;'+
    '    }'+
    ''+
    '    .es-desk-hidden {'+
    '      display: none;'+
    '      float: left;'+
    '      overflow: hidden;'+
    '      width: 0;'+
    '      max-height: 0;'+
    '      line-height: 0;'+
    '      mso-hide: all;'+
    '    }'+
    ''+
    '    .es-header-body a:hover {'+
    '      color: #666666 !important;'+
    '    }'+
    ''+
    '    .es-content-body a:hover {'+
    '      color: #5c68e2 !important;'+
    '    }'+
    ''+
    '    .es-footer-body a:hover {'+
    '      color: #333333 !important;'+
    '    }'+
    ''+
    '    .es-infoblock a:hover {'+
    '      color: #cccccc !important;'+
    '    }'+
    ''+
    '    .es-button-border:hover>a.es-button {'+
    '      color: #ffffff !important;'+
    '    }'+
    ''+
    '    @media only screen and (max-width:600px) {'+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0l {'+
    '        padding-left: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      .es-m-p20b {'+
    '        padding-bottom: 20px !important'+
    '      }'+
    ''+
    '      .es-m-p0r {'+
    '        padding-right: 0px !important'+
    '      }'+
    ''+
    '      *[class="gmail-fix"] {'+
    '        display: none !important'+
    '      }'+
    ''+
    '      p,'+
    '      a {'+
    '        line-height: 150% !important'+
    '      }'+
    ''+
    '      h1,'+
    '      h1 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      h2,'+
    '      h2 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      h3,'+
    '      h3 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      h4,'+
    '      h4 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      h5,'+
    '      h5 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      h6,'+
    '      h6 a {'+
    '        line-height: 120% !important'+
    '      }'+
    ''+
    '      .es-header-body p {}'+
    ''+
    '      .es-content-body p {}'+
    ''+
    '      .es-footer-body p {}'+
    ''+
    '      .es-infoblock p {}'+
    ''+
    '      h1 {'+
    '        font-size: 36px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      h2 {'+
    '        font-size: 26px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      h3 {'+
    '        font-size: 20px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      h4 {'+
    '        font-size: 24px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      h5 {'+
    '        font-size: 20px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      h6 {'+
    '        font-size: 16px !important;'+
    '        text-align: left'+
    '      }'+
    ''+
    '      .es-header-body h1 a,'+
    '      .es-content-body h1 a,'+
    '      .es-footer-body h1 a {'+
    '        font-size: 36px !important'+
    '      }'+
    ''+
    '      .es-header-body h2 a,'+
    '      .es-content-body h2 a,'+
    '      .es-footer-body h2 a {'+
    '        font-size: 26px !important'+
    '      }'+
    ''+
    '      .es-header-body h3 a,'+
    '      .es-content-body h3 a,'+
    '      .es-footer-body h3 a {'+
    '        font-size: 20px !important'+
    '      }'+
    ''+
    '      .es-header-body h4 a,'+
    '      .es-content-body h4 a,'+
    '      .es-footer-body h4 a {'+
    '        font-size: 24px !important'+
    '      }'+
    ''+
    '      .es-header-body h5 a,'+
    '      .es-content-body h5 a,'+
    '      .es-footer-body h5 a {'+
    '        font-size: 20px !important'+
    '      }'+
    ''+
    '      .es-header-body h6 a,'+
    '      .es-content-body h6 a,'+
    '      .es-footer-body h6 a {'+
    '        font-size: 16px !important'+
    '      }'+
    ''+
    '      .es-menu td a {'+
    '        font-size: 12px !important'+
    '      }'+
    ''+
    '      .es-header-body p,'+
    '      .es-header-body a {'+
    '        font-size: 14px !important'+
    '      }'+
    ''+
    '      .es-content-body p,'+
    '      .es-content-body a {'+
    '        font-size: 14px !important'+
    '      }'+
    ''+
    '      .es-footer-body p,'+
    '      .es-footer-body a {'+
    '        font-size: 14px !important'+
    '      }'+
    ''+
    '      .es-infoblock p,'+
    '      .es-infoblock a {'+
    '        font-size: 12px !important'+
    '      }'+
    ''+
    '      .es-m-txt-c,'+
    '      .es-m-txt-c h1,'+
    '      .es-m-txt-c h2,'+
    '      .es-m-txt-c h3,'+
    '      .es-m-txt-c h4,'+
    '      .es-m-txt-c h5,'+
    '      .es-m-txt-c h6 {'+
    '        text-align: center !important'+
    '      }'+
    ''+
    '      .es-m-txt-r,'+
    '      .es-m-txt-r h1,'+
    '      .es-m-txt-r h2,'+
    '      .es-m-txt-r h3,'+
    '      .es-m-txt-r h4,'+
    '      .es-m-txt-r h5,'+
    '      .es-m-txt-r h6 {'+
    '        text-align: right !important'+
    '      }'+
    ''+
    '      .es-m-txt-j,'+
    '      .es-m-txt-j h1,'+
    '      .es-m-txt-j h2,'+
    '      .es-m-txt-j h3,'+
    '      .es-m-txt-j h4,'+
    '      .es-m-txt-j h5,'+
    '      .es-m-txt-j h6 {'+
    '        text-align: justify !important'+
    '      }'+
    ''+
    '      .es-m-txt-l,'+
    '      .es-m-txt-l h1,'+
    '      .es-m-txt-l h2,'+
    '      .es-m-txt-l h3,'+
    '      .es-m-txt-l h4,'+
    '      .es-m-txt-l h5,'+
    '      .es-m-txt-l h6 {'+
    '        text-align: left !important'+
    '      }'+
    ''+
    '      .es-m-txt-r img,'+
    '      .es-m-txt-c img,'+
    '      .es-m-txt-l img,'+
    '      .es-m-txt-r .rollover:hover .rollover-second,'+
    '      .es-m-txt-c .rollover:hover .rollover-second,'+
    '      .es-m-txt-l .rollover:hover .rollover-second {'+
    '        display: inline !important'+
    '      }'+
    ''+
    '      .es-m-txt-r .rollover div,'+
    '      .es-m-txt-c .rollover div,'+
    '      .es-m-txt-l .rollover div {'+
    '        line-height: 0 !important;'+
    '        font-size: 0 !important'+
    '      }'+
    ''+
    '      .es-spacer {'+
    '        display: inline-table'+
    '      }'+
    ''+
    '      a.es-button,'+
    '      button.es-button {'+
    '        font-size: 20px !important'+
    '      }'+
    ''+
    '      .es-m-fw,'+
    '      .es-m-fw.es-fw,'+
    '      .es-m-fw .es-button {'+
    '        display: block !important'+
    '      }'+
    ''+
    '      .es-m-il,'+
    '      .es-m-il .es-button,'+
    '      .es-social,'+
    '      .es-social td,'+
    '      .es-menu {'+
    '        display: inline-block !important'+
    '      }'+
    ''+
    '      .es-adaptive table,'+
    '      .es-left,'+
    '      .es-right {'+
    '        width: 100% !important'+
    '      }'+
    ''+
    '      .es-content table,'+
    '      .es-header table,'+
    '      .es-footer table,'+
    '      .es-content,'+
    '      .es-footer,'+
    '      .es-header {'+
    '        width: 100% !important;'+
    '        max-width: 600px !important'+
    '      }'+
    ''+
    '      .adapt-img {'+
    '        width: 100% !important;'+
    '        height: auto !important'+
    '      }'+
    ''+
    '      .es-mobile-hidden,'+
    '      .es-hidden {'+
    '        display: none !important'+
    '      }'+
    ''+
    '      .es-desk-hidden {'+
    '        width: auto !important;'+
    '        overflow: visible !important;'+
    '        float: none !important;'+
    '        max-height: inherit !important;'+
    '        line-height: inherit !important'+
    '      }'+
    ''+
    '      tr.es-desk-hidden {'+
    '        display: table-row !important'+
    '      }'+
    ''+
    '      table.es-desk-hidden {'+
    '        display: table !important'+
    '      }'+
    ''+
    '      td.es-desk-menu-hidden {'+
    '        display: table-cell !important'+
    '      }'+
    ''+
    '      .es-menu td {'+
    '        width: 1% !important'+
    '      }'+
    ''+
    '      table.es-table-not-adapt,'+
    '      .esd-block-html table {'+
    '        width: auto !important'+
    '      }'+
    ''+
    '      .es-social td {'+
    '        padding-bottom: 10px'+
    '      }'+
    ''+
    '      .h-auto {'+
    '        height: auto !important'+
    '      }'+
    ''+
    '      a.es-button,'+
    '      button.es-button {'+
    '        display: inline-block !important'+
    '      }'+
    ''+
    '      .es-button-border {'+
    '        display: inline-block !important'+
    '      }'+
    '    }'+
    '  </style>'+
    '</head>'+
    ''+
    '<body style="width:100%;height:100%;padding:0;Margin:0">'+
    '  <div class="es-wrapper-color" style="background-color:#FAFAFA">'+
    '    <!--[if gte mso 9]>'+
    '			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">'+
    '				<v:fill type="tile" color="#fafafa"></v:fill>'+
    '			</v:background>'+
    '		<![endif]-->'+
    '    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"'+
    '      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">'+
    '      <tr>'+
    '        <td valign="top" style="padding:0;Margin:0">'+
    ''+
    '          <table cellpadding="0" cellspacing="0" class="es-header" align="center"'+
    '            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">'+
    '            <tr>'+
    '              <td align="center" style="padding:0;Margin:0">'+
    '                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0"'+
    '                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">'+
    '                  <tr>'+
    '                    <td align="left" style="padding:20px;Margin:0">'+
    '                      <table cellpadding="0" cellspacing="0" width="100%"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                        <tr>'+
    '                          <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                                <td align="center" style="padding:0;Margin:0;display:none"></td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    '                </table>'+
    '              </td>'+
    '            </tr>'+
    '          </table>'+
    '          <table cellpadding="0" cellspacing="0" class="es-content" align="center"'+
    '            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">'+
    '            <tr>'+
    '              <td align="center" style="padding:0;Margin:0">'+
    '                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0"'+
    '                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">'+
    '                  <tr>'+
    '                    <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-right:20px;padding-left:20px">'+
    '                      <table cellpadding="0" cellspacing="0" width="100%"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                        <tr>'+
    '                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                                <td align="center"'+
    '                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img style="height: 150px;" src="http://'+urlHost+'/public/admin/assets/img/payment-success.png" /></td>'+
    '                              </tr>'+
    '                              <tr>'+
    '                                <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px">'+
    '                                  <h1'+
    '                                    style="Margin:0;font-family:arial, \'helvetica neue\', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:46px;color:#333333">'+
    '                                    Cảm ơn vì đã chọn chúng tôi!</h1>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    '                </table>'+
    '              </td>'+
    '            </tr>'+
    '          </table>'+
    '          <table cellpadding="0" cellspacing="0" class="es-content" align="center"'+
    '            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">'+
    '            <tr>'+
    '              <td align="center" style="padding:0;Margin:0">'+
    '                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0"'+
    '                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">'+
    '                  <tr>'+
    '                    <td align="left"'+
    '                      style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:10px;padding-top:20px">'+
    '                      <table cellpadding="0" cellspacing="0" width="100%"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                        <tr>'+
    '                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                                <td align="center" class="es-m-p0r es-m-p0l"'+
    '                                  style="Margin:0;padding-top:5px;padding-right:40px;padding-bottom:5px;padding-left:40px">'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                   Đơn đặt hàng của bạn hiện đã được hoàn thành! <br>Chúng tôi đã đính kèm biên nhận của bạn vào email này.</p>'+
    '                                </td>'+
    '                              </tr>'+
    '                              <tr>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    ''+ productsHtml

    myvar = myvar +
    '                  <!-- Subtotal -->'+
    '                  <tr>'+
    '                    <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:10px">'+
    '                      <table cellpadding="0" cellspacing="0" width="100%"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                        <tr>'+
    '                          <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:560px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-top:2px solid #efefef;border-bottom:2px solid #efefef"'+
    '                              role="presentation">'+
    '                              <tr>'+
    '                                <td align="right" class="es-m-txt-r"'+
    '                                  style="padding:0;Margin:0;padding-top:10px;padding-bottom:20px">'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Thành tiền: <strong>'+new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(order.subTotal))+'</strong><br>Phí vận chuyển: <strong>'+new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(order.ship.price ?? 0))+'</strong><br>Total: <strong>'+new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(order.total))+'</strong>'+
    '                                  </p>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    '                  <!-- Subtotal -->'+
    ''+
    '                  <!-- Ship info -->'+
    '                  <tr>'+
    '                    <td align="left"'+
    '                      style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:10px;padding-top:20px">'+
    '                      <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:280px" valign="top"><![endif]-->'+
    '                      <table cellpadding="0" cellspacing="0" class="es-left" align="left"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">'+
    '                        <tr>'+
    '                          <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:280px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                                <td align="left" style="padding:0;Margin:0">'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Khách hàng: <strong>'+customer+'</strong></p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Đơn hàng: <strong>'+order._id+'</strong></p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Ngày: <strong>'+new Date(order.createdAt).toLocaleDateString('vi-VN')+'</strong></p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Payment method: <strong>STRIPE</strong></p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Currency: <strong>VND</strong></p>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                      <!--[if mso]></td><td style="width:0px"></td><td style="width:280px" valign="top"><![endif]-->'+
    '                      <table cellpadding="0" cellspacing="0" class="es-right" align="right"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">'+
    '                        <tr>'+
    '                          <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:280px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                                <td align="left" class="es-m-txt-l" style="padding:0;Margin:0">'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Shipping Name: <strong>'+order.shippingAddress.fullname+'</strong></p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    Shipping Address:</p>'+
    '                                  <p'+
    '                                    style="Margin:0;mso-line-height-rule:exactly;font-family:arial, \'helvetica neue\', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">'+
    '                                    <strong>'+order.shippingAddress.address+'</strong></p>'+
    '                                </td>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                      <!--[if mso]></td></tr></table><![endif]-->'+
    '                    </td>'+
    '                  </tr>'+
    '                  <!-- Ship info -->'+
    '                </table>'+
    '              </td>'+
    '            </tr>'+
    '          </table>'+
    '          <table cellpadding="0" cellspacing="0" class="es-content" align="center"'+
    '            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">'+
    '            <tr>'+
    '              <td class="es-info-area" align="center" style="padding:0;Margin:0">'+
    '                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0"'+
    '                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"'+
    '                  bgcolor="#FFFFFF">'+
    '                  <tr>'+
    '                    <td align="left" style="padding:20px;Margin:0">'+
    '                      <table cellpadding="0" cellspacing="0" width="100%"'+
    '                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                        <tr>'+
    '                          <td align="center" valign="top" style="padding:0;Margin:0;width:560px">'+
    '                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"'+
    '                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">'+
    '                              <tr>'+
    '                              </tr>'+
    '                            </table>'+
    '                          </td>'+
    '                        </tr>'+
    '                      </table>'+
    '                    </td>'+
    '                  </tr>'+
    '                </table>'+
    '              </td>'+
    '            </tr>'+
    '          </table>'+
    '        </td>'+
    '      </tr>'+
    '    </table>'+
    '  </div>'+
    '</body>'+
    '</html>';
      
    return myvar;
  }

  static sendPassword(urlHost, password) : String{
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
     <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title>Reset email</title>
      <style type="text/css">
    .rollover:hover .rollover-first {
      max-height:0px!important;
      display:none!important;
      }
      .rollover:hover .rollover-second {
      max-height:none!important;
      display:inline-block!important;
      }
      .rollover div {
      font-size:0px;
      }
      u ~ div img + div > div {
      display:none;
      }
      #outlook a {
      padding:0;
      }
      span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color:inherit;
      mso-style-priority:99;
      }
      a.es-button {
      mso-style-priority:100!important;
      text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
      color:inherit!important;
      text-decoration:none!important;
      font-size:inherit!important;
      font-family:inherit!important;
      font-weight:inherit!important;
      line-height:inherit!important;
      }
      .es-desk-hidden {
      display:none;
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
      mso-hide:all;
      }
      .es-header-body a:hover {
      color:#666666!important;
      }
      .es-content-body a:hover {
      color:#5c68e2!important;
      }
      .es-footer-body a:hover {
      color:#333333!important;
      }
      .es-infoblock a:hover {
      color:#cccccc!important;
      }
      .es-button-border:hover > a.es-button {
      color:#ffffff!important;
      }
    @media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img, .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } }
    </style>
     </head>
     <body style="width:100%;height:100%;padding:0;Margin:0">
      <div class="es-wrapper-color" style="background-color:#FAFAFA">
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
         <tr>
          <td valign="top" style="padding:0;Margin:0">
           <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
             <tr>
              <td align="center" style="padding:0;Margin:0">
               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                 <tr>
                  <td align="left" style="Margin:0;padding-top:30px;padding-right:20px;padding-bottom:30px;padding-left:20px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://slrxyq.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="100"></td>
                         </tr>
                         <tr>
                         <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:40px;color:#333333">Mật khẩu mới của bạn là</h3></td>
                         </tr>
                         <tr>
                         <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h3 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:40px;color:#333333">`+password+`</h3></td>
                         </tr>
                         
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </div>
     </body>
    </html>`;
  }

  
}
