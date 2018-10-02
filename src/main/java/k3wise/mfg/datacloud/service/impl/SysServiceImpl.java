package k3wise.mfg.datacloud.service.impl;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import k3wise.mfg.datacloud.domain.sys.SysUser;
import k3wise.mfg.datacloud.mapper.SysUserMapper;
import k3wise.mfg.datacloud.service.SysService;



@Service

public class SysServiceImpl implements SysService {

	@Autowired
	private SysUserMapper sysUserMapper;
	

	@Override
	public SysUser getSysUserByName(String username) throws Exception {
		SysUser sysUser = new SysUser();
		sysUser = sysUserMapper.getSysUserByName(username);

		return sysUser;
	}
	
	@Override
    public Set<String> queryRolesByName(String userName){
        return sysUserMapper.queryRolesByName(userName);
    }
}

