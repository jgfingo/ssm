package k3wise.mfg.datacloud.controller;


import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import k3wise.mfg.datacloud.Utils.CacheUtil;
import k3wise.mfg.datacloud.entities.BaseResult;
import k3wise.mfg.datacloud.service.UserTestService;


@Controller
public class UserTestController {

	Logger log = Logger.getLogger(UserTestController.class);  
	@Autowired
	UserTestService usertestservice;
	
//	@RequestMapping("/")
//	@ResponseBody
//	public List<Map<String,Object>> getItemById() throws Exception{
//		log.info("ggggg");
//		String sql="select * from t_user";
//		List<Map<String,Object>> result = usertestservice.getdata(sql);
//		return result;
//	}
//		@RequestMapping("/set/{key}/{value}")
	@ResponseBody
	public String setRedis(@PathVariable String key,@PathVariable String value) throws Exception{
		Boolean boolean1=CacheUtil.setString(key, value);
		return boolean1+"";
	}
	
	@RequestMapping("/get/{key}")
	@ResponseBody

	}
	
	@RequestMapping("/rs/{key}/{value}")
	@ResponseBody
	public String testRs(@PathVariable String key,@PathVariable String value) throws Exception{
		//注解方式试验
		return usertestservice.testRs(key, value);
	}
}
