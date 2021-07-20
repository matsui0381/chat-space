class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
  
  def create
  @mail = "sakaue@matsui-shuzo.co.jp"

  @messages = @group.messages.new(message_params)
    if @messages.save
      UserMailer.with(@mail).welcome_mail.deliver_later
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージを送信しました" }
        format.json
      end
    end
  end

  def edit
    @message = Message.find(params[:id])
  end

  def update
    if  @message.update(message_params)
        redirect_to root_path, notice: '日報を編集しました'
    else
      render :edit
      
    end
  end
    private
    def message_params
      params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
    end
    def set_group
      @group = Group.find(params[:group_id])
    end
end
