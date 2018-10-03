package k3wise.mfg.datacloud.shiro;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import k3wise.mfg.datacloud.domain.sys.SysUser;
import k3wise.mfg.datacloud.service.SysService;



public class CustomRealm extends AuthorizingRealm {

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private SysService sysService;
	

	
	@Override
	public void setName(String name) {
		super.setName("customRealm");
	}

	/**
	 * realm的认证方法，从数据库查询用户信息
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		String username = (String) token.getPrincipal();
		SysUser sysUser = null;
		
		try {
			sysUser = sysService.getSysUserByName(username);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		
		// 如果查询不到返回null
		if(sysUser==null){
			if (logger.isDebugEnabled()){
				logger.debug("user not exist!");
			}
			return null;
		}
		
		String password = sysUser.getPassword();


		SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
				sysUser.getUsername(), password, this.getName());

		return simpleAuthenticationInfo;
	}

	/**
	 * realm的授权方法
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        /* 这里编写授权代码 */  
        Set<String> roleNames = new HashSet<String>();  
        Set<String> permissions = new HashSet<String>();  
        roleNames.add("administrator");  
        roleNames.add("zhangsan");  
        permissions.add("user.do?myjsp");  
        permissions.add("login.do?main");  
        permissions.add("login.do?logout");  
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);  
        info.setStringPermissions(permissions);  
        return info; 
	}
	
	//清除缓存
	public void clearCached() {
		PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
		super.clearCache(principals);
	}
}
