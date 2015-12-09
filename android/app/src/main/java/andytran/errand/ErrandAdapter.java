package andytran.errand;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseExpandableListAdapter;

import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by Andy Tran on 12/8/2015.
 */
public class ErrandAdapter extends ArrayAdapter<Errand> {
    private class ViewHolder{
        CircleImageView customerPic;
    }

    private Context context;
    private List<Errand> errandList;

    public ErrandAdapter(Context context, List<Errand> list){
        super(context,-1, list);
        this.context = context;
        this.errandList = list;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return super.getView(position, convertView, parent);
    }
}
