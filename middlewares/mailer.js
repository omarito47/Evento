import nodemailer from 'nodemailer'
async function SendEmail(receiver) {

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", //
    port: 587, //
    secure: false,
    auth: {
      user: "samaous4321@gmail.com", //
      pass: "EBIy1v2AUFDS53Kx", //
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: 'Evento <Reclamation@Evento.tn>',
    to: receiver,
    subject: "About Your Reclamation",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  <title>Evento</title>


</head>
<body>

<div class="adn ads" data-message-id="16125bb2badaf364" data-legacy-message-id="16125bb2badaf364" style="border-left: 1px solid transparent; padding-bottom: 20px; padding-left: 8px; color: rgb(34, 34, 34); font-family: arial,sans-serif; font-size: medium; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255);">
<div class="gs" style="margin-left: 44px;">
<div id=":1mv" class="ii gt" style="margin: 5px 15px 0px 0px; font-size: 12.8px; direction: ltr; padding-bottom: 5px; position: relative;">
<div id=":1mw" class="a3s aXjCH m16125bb2badaf364" style="overflow: hidden;">
<div style="margin: 6px auto; width: 1050px; text-align: center;">
<div>
<table style="margin: 0px auto; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; width: 600px; text-align: left; color: rgb(85, 85, 85);">

  <tbody>

    <tr>

      <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;">
      <div style="border-bottom: 2px solid rgb(116, 141, 166); margin: 0px 0px 10px; padding: 0px 0px 20px; color: rgb(85, 85, 85); height: auto; text-align: right;">
      <table style="font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;" border="0" cellpadding="0" cellspacing="0" width="100%">

        <tbody>

          <tr>

            <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;" align="left" valign="bottom">
            <h1 style="color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); font-family: Verdana;"><span style="color: rgb(0, 44, 132);">Eve</span><span style="color: rgb(0, 158, 222);">nto</span></h1>

            </td>

            <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;" width="100%"></td>

          </tr>

        </tbody>
      </table>

      </div>

      <span style="padding: 0px; vertical-align: top; letter-spacing: normal; line-height: 28.6px; border-collapse: collapse; font-family: Arial,sans-serif; font-size: 22px; display: block; color: rgb(0, 94, 166); font-weight: bold;">Cher Client,</span><span style="padding: 0px; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; font-weight: normal; display: block; color: rgb(85, 85, 85);">
      <h1 style="margin: 20px 0px 5px; vertical-align: top; letter-spacing: normal; line-height: 23.4px; border-collapse: collapse; font-family: Arial,sans-serif; font-size: 18px; font-weight: bold; color: rgb(85, 85, 85);">Votre Reclamation a ete bien traiter .</h1>

      </span>
      <table style="font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;">

        <tbody>

          <tr>

            <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;"><span style="padding: 0px; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; font-weight: normal; display: block; color: rgb(85, 85, 85);"></span>
            <table style="border: 1px solid rgb(116, 141, 166); margin: 10px 0px; padding: 10px; background: rgb(245, 249, 252) none repeat scroll 0% 50%; -moz-background-clip: initial; -moz-background-origin: initial; -moz-background-inline-policy: initial; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; width: 575px; text-align: center;">

              <tbody>

                <tr>

                  <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;"><span style="padding: 0px; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; font-weight: normal; color: rgb(85, 85, 85);">
                  <h2 style="margin: 0px; padding: 15px 10px; vertical-align: top; letter-spacing: normal; border-collapse: collapse; font-family: Arial,sans-serif; font-size: 16px; line-height: 18px; font-weight: normal; text-align: center; color: rgb(85, 85, 85);">Votre Reclamation </h2>

                  </span></td>

                </tr>

              </tbody>
            </table>

            </td>

          </tr>

        </tbody>
      </table>

      <div style="text-align: left;">
      <table class="m_-2570676900531313005deviceWidth" style="font-family: &quot;Times New Roman&quot;; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px;" align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="600">

        <tbody>

          <tr>

            <td style="margin: 0px; font-family: arial,sans-serif; border-collapse: collapse ! important;" valign="top"><span style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); float: none; display: inline ! important;">Our technical support and customer department has recently suspected activities in your account.</span><br style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">

            <br style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">

            <span style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); float: none; display: inline ! important;">Therefore
Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dicta natus aliquam totam doloribus nemo, amet nostrum veniam itaque. Enim quibusdam incidunt dignissimos voluptates dolore.</span><br style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">

            <br style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px;">

            <span style="color: rgb(86, 86, 86); font-family: Helvetica,Arial,sans-serif; font-size: 13px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); float: none; display: inline ! important;">We're always concerned about our customers security so please help us recover your account by following the link below.</span><span style="color: rgb(32, 32, 32); font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); float: none; font-family: Helvetica,Arial,sans-serif; display: inline ! important;"></span><br>

            </td>

          </tr>

          <tr>

            <td style="margin: 0px; font-family: arial,sans-serif; padding-top: 10px; padding-bottom: 20px; border-collapse: collapse ! important;" align="center" bgcolor="#ffffff" valign="top">
            <table class="m_-2570676900531313005deviceWidth" style="font-family: &quot;Times New Roman&quot;; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px;" align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="600">

              <tbody>

                <tr>

                  <td style="margin: 0px; font-family: arial,sans-serif; padding-top: 10px; padding-bottom: 20px; border-collapse: collapse ! important;" align="center" bgcolor="#ffffff" valign="top"><br class="Apple-interchange-newline">

                  <table class="m_-2570676900531313005center m_-2570676900531313005deviceWidth" border="0" cellpadding="0" cellspacing="0" width="422">

                    <tbody>

                      <tr>

                        <td style="margin: 0px; font-family: arial,sans-serif; border-collapse: collapse ! important;" valign="top">
                        <table class="m_-2570676900531313005deviceWidth" style="text-align: left; margin-left: auto; margin-right: auto;" border="0" cellpadding="0" cellspacing="0" width="210">

                          <tbody>

                            <tr>

                              <td class="m_-2570676900531313005center" style="margin: 0px; font-family: arial,sans-serif; padding-top: 10px; border-collapse: collapse ! important;" align="center" valign="top">
                              <table class="m_-2570676900531313005center" style="width: 223px; height: 40px;" align="center" border="0" cellpadding="0" cellspacing="0">

                                <tbody>

                                  <tr>

                                    <td style="margin: 0px; font-family: arial,sans-serif; padding-top: 10px; padding-bottom: 10px; color: rgb(255, 255, 255); background-color: rgb(51, 51, 255); border-collapse: collapse ! important;" align="center" bgcolor="#af88c3" width="180"><a href="#" style="color: rgb(255, 255, 255); text-decoration: none; font-size: 16px; font-family: Arial,Helvetica,sans-serif;"><b>Confirm</b></a></td>

                                  </tr>

                                </tbody>
                              </table>

                              </td>

                            </tr>

                          </tbody>
                        </table>

                        </td>

                      </tr>

                    </tbody>
                  </table>

                  </td>

                </tr>

              </tbody>
            </table>

            <br class="Apple-interchange-newline">

            </td>

          </tr>

        </tbody>
      </table>

      <span style="color: rgb(102, 102, 102); font-family: arial,sans-serif; font-size: 13.3333px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">Yours Sincerely. </span></div>

      <table style="border-top: 2px solid rgb(116, 141, 166); vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; margin-top: 20px; width: 598px;">

        <tbody>

          <tr>

            <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;">
            <table style="font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;">

              <tbody>

                <tr>

                  <td style="margin: 0px; font-family: Arial,sans-serif; font-size: 14px; border-collapse: collapse; line-height: 18.2px; letter-spacing: normal; vertical-align: top;">
                  <p style="margin: 5px 0px; padding: 0px; vertical-align: top; letter-spacing: normal; line-height: 18.2px; border-collapse: collapse; font-size: 14px; font-family: Arial,sans-serif; font-weight: normal; color: rgb(85, 85, 85);"><span style="color: rgb(102, 102, 102); font-family: arial,sans-serif; font-size: 13.3333px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">Please
do not reply to this email. We are unable to respond to inquiries sent
to this address. For immediate answers to your questions, visit our
Help Center by clicking "Help" located on any Evento page or email.</span><br style="color: rgb(102, 102, 102); font-family: arial,sans-serif; font-size: 13.3333px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255);">

                  <span style="color: rgb(102, 102, 102); font-family: arial,sans-serif; font-size: 13.3333px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">Copyright &copy; 2023 Evento, Inc. All rights reserved. </span>

                  </td>

                </tr>

              </tbody>
            </table>

            <br>

            </td>

          </tr>

        </tbody>
      </table>

      </td>

    </tr>

  </tbody>
</table>

<div class="yj6qo"></div>

</div>

</div>

</div>

</div>

</div>

</div>

</body>
</html>
'
    `, 
   
  });

  console.log(info.messageId);
}

export default SendEmail ;
