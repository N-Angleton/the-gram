class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render '/api/session/create'
        else
            render json: @user.errors.full_messages, status: 404
        end
    end

    def update
        @user = User.find(params[:id])

        if @user.update({photo: params[:user][:photo]})
            render '/api/session/create'
        else
            render json: @user.errors.full_messages, status: 404
        end
    end

    # this is all of a given users info, including their posts
    # the current user is also included, in case their follow requests are relevant
    def show
        @user = User.includes(:approved_follower_requests, :unapproved_follower_requests, :pending_follow_requests, :approved_follow_requests, posts: {comments: :commenter, likes: :liker}).find_by(username: params[:id])
        @c_user = User.includes(:approved_follower_requests, :unapproved_follower_requests, :pending_follow_requests, :approved_follow_requests).find(current_user.id)
        render '/api/users/show'
    end

    def destroy
        @user = current_user
        logout(@user)
        @user.destroy
        render json: ['User deleted']
    end

    def user_params
        params.require(:user).permit(:id, :username, :password, :full_name, :email, :photo)
    end

end