package k3wise.mfg.datacloud.mapper;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import k3wise.mfg.datacloud.domain.UserTest;

public interface UserTestMapper {
    int deleteByPrimaryKey(Integer id);

	int insert(UserTest record);

	int insertSelective(UserTest record);

	UserTest selectByPrimaryKey(Integer id);

	int updateByPrimaryKeySelective(UserTest record);

	int updateByPrimaryKey(UserTest record);

	List<Map<String,Object>> selectbysql(String sql);
}