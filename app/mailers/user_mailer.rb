class UserMailer < ActionMailer::Base
    def welcome_email
      @mail = "sakaue@matsui-shuzo.co.jp"
      mail(to: @mail, subject: 'メールのタイトルがここに入ります')
    end
  end
