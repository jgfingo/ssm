package k3wise.mfg.datacloud.service;

import java.util.List;
import java.util.Map;

public interface UserTestService {
	List<Map<String,Object>> getdata(String sql);
	
	String testRs(String key,String value);
}
