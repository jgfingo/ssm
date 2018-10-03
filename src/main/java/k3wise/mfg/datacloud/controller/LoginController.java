package k3wise.mfg.datacloud.controller;




import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



import k3wise.mfg.datacloud.Utils.CacheUtil;
import k3wise.mfg.datacloud.Utils.CollectionsFactory;
import k3wise.mfg.datacloud.service.UserTestService;


@Controller
public class LoginController {

	Logger log = Logger.getLogger(UserTestController.class);  
	@Autowired
	UserTestService usertestservice;
	
	/**
	 * shiro ajax登录 
	 */
	@RequestMapping(value = "/userLogin")
	@ResponseBody
	public Map<String,Object> userLogin(@RequestParam String username,@RequestParam String password) throws Exception{
	    
		Map<String,Object> map = CollectionsFactory.newHashMap();

		Subject currentUser = SecurityUtils.getSubject();
	    if (!currentUser.isAuthenticated()) {
	    	UsernamePasswordToken token = new UsernamePasswordToken(username, password);
	        try{
	            currentUser.login(token);
	        }catch(UnknownAccountException ex){
	        	map.put("msg", "account_error");
	        }catch(IncorrectCredentialsException ex){
	        	map.put("msg", "password_error");
	        }catch(AuthenticationException ex){
	        	map.put("msg", "authentication_error");
	        }
	    }
	    //返回json数据
	    return map;
	}
	
//	//跳转登录
//	@RequestMapping(value={"/"})
//	public String login()throws Exception{
//		return "login";
//	}
	
//	@RequestMapping("/")
//	@ResponseBody
//	public List<Map<String,Object>> getItemById() throws Exception{
//		log.info("ggggg");
//		String sql="select * from t_user";
//		List<Map<String,Object>> result = usertestservice.getdata(sql);
//		return result;
//	}
	
//	@RequestMapping("/set/{key}/{value}")
//	@ResponseBody
//	public String setRedis(@PathVariable String key,@PathVariable String value) throws Exception{
//		Boolean boolean1=CacheUtil.setString(key, value);
//		return boolean1+"";
//	}
//	
	@RequestMapping("/test")
	@ResponseBody
	public String getRedis() throws Exception{
		
		return "test";
	}
//	
//	@RequestMapping("/rs/{key}/{value}")
//	@ResponseBody
//	public String testRs(@PathVariable String key,@PathVariable String value) throws Exception{
//		//注解方式试验
//		return usertestservice.testRs(key, value);
//	}
}
