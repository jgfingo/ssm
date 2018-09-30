package k3wise.mfg.datacloud.exception;

public class CustomException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	private String message; //异常信息
	
	public CustomException(String message){
		super(message);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
