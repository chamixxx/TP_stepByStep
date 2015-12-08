package ejb;

import javax.ejb.Local;

import model.UserModel;

@Local
public interface MessageSenderQueueLocal {

	public void sendMessage(UserModel user);

}
