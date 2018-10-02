package k3wise.mfg.datacloud.mapper;


import java.util.Set;

import org.springframework.stereotype.Repository;
import k3wise.mfg.datacloud.domain.sys.SysUser;

public interface SysUserMapper {
	public SysUser getSysUserByName(String userName);

    public Set<String> queryRolesByName(String userName);
}
