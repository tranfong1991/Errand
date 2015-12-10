package andytran.errand;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseExpandableListAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by Andy Tran on 12/8/2015.
 */
public class ErrandAdapter extends ArrayAdapter<Errand> {
    private class ViewHolder{
        CircleImageView customerPic;
        TextView compensation;
        TextView description;
        TextView location;
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
        View rowView = convertView;

        if(rowView == null){
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            rowView = inflater.inflate(R.layout.errand, null);

            final ViewHolder viewHolder = new ViewHolder();
            viewHolder.customerPic = (CircleImageView) rowView.findViewById(R.id.profile_image);
            viewHolder.compensation = (TextView) rowView.findViewById(R.id.errand_compensation);
            viewHolder.description = (TextView) rowView.findViewById(R.id.errand_description);

            rowView.setTag(viewHolder);
        }

        Errand errand = errandList.get(position);
        ViewHolder holder = (ViewHolder)rowView.getTag();

        holder.compensation.setText(String.valueOf(errand.getCompensation()));
        holder.description.setText(errand.getDescription());

        return rowView;
    }
}
