package ejb;

import java.io.Serializable;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.DeliveryMode;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.JMSProducer;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import model.UserModel;

/**
 * Session Bean implementation class MessageSenderQueue
 */
@Stateless
@LocalBean
public class MessageSenderQueue implements MessageSenderQueueLocal {

    @Inject
    JMSContext context;
    
    @Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
    
	
    @Override
    public void sendMessage(UserModel user) {
    	try {
    		ObjectMessage message = context.createObjectMessage();
    		message.setObject(user);
    		JMSProducer producer = context.createProducer();
    		producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
    		producer.send(queue, message);
    	} catch (JMSException e) {
    		e.printStackTrace();
    	}
    	}
  

}
