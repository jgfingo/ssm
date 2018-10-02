package k3wise.mfg.datacloud.service;

import java.util.Set;

import k3wise.mfg.datacloud.domain.sys.SysUser;

public interface SysService {
	SysUser getSysUserByName(String username)throws Exception;
	Set<String> queryRolesByName(String userName)throws Exception;
}
