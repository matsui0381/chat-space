class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user).order(created_at: "DESC")
  end
  
  def create
    @messages = @group.messages.new(message_params)
    if @messages.save
      flash[:notice] = "日報を送信しました"
      redirect_to group_messages_path(@group)
      # respond_to do |format|
      #   format.html { redirect_to group_messages_path(@group), notice: "日報を送信しました" }
      #   format.json
      # end
    else
      redirect_to group_messages_path(@group), alert: "日報を送信できませんでした"
    end
  end

  def edit
    @message = Message.find(params[:id])
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
        redirect_to group_messages_path(params[:group_id]), notice: "日報を編集しました"
    else
      render :edit
    end
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    redirect_to group_messages_path(params[:group_id]), notice: "日報を削除しました"
  end

  private
    def message_params
      params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
    end

    def set_group
      @group = Group.find(params[:group_id])
    end
  end
