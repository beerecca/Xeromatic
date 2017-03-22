using System.Collections.Generic;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Tweet = Xeromatic.Models.Tweet;
using Xeromatic.Services;

namespace Xeromatic.Services
{
    public class TwitterApiService : ITwitterService
    {
        // Get keys from: https://apps.twitter.com
        // Wiki for tweetinvi: https://github.com/linvi/tweetinvi/wiki

        readonly TwitterCredentials _creds;

        public TwitterApiService()
        {
            _creds = new TwitterCredentials
            {
                ConsumerKey = "4gnmcysx1NAgsmb93tfUvDGE0",
                ConsumerSecret = "4oHhSwrFbqDFYS13441tDIUYY2wvvqyR9asfe5N5mwcV84AZff",
                AccessToken = "34424237-sD96x1Vxdo7mTQ7F8urJTNYkX5MjN5cx3EnoWUF3T",
                AccessTokenSecret = "N3h9rXLkMhQOFkFd7ou4y2yO0AA1TTNRULDcPj3BCMLOT"

            };
        }

        public IEnumerable<Tweet> GetTweets()
        {
            var tweets =
                Auth.ExecuteOperationWithCredentials(_creds, () => Timeline.GetUserTimeline("xero", 10))?.ToList();

            if (tweets != null && tweets.Any())
            {
                return tweets.Select(t => new Tweet
                {
                    Id = t.Id,
                    Text = t.Text
                });
            }

            return new List<Tweet>();
        }

    }
}